/**
 * PgwBrowser - Version 1.3.1
 * Copyright 2014-2015, Jonathan M. Piat - https://github.com/jonathan-piat - http://pgwjs.com
 * Fork by Daniel M. Hendricks - https://github.com/dmhendricks/PgwBrowser - https://www.danhendricks.com
 * @license GPL-3.0 - http://opensource.org/licenses/gpl-3.0
 *
 * Includes:
 *    jQuery.browser.mobile (http://detectmobilebrowser.com/)
 */

// @koala-append "vendor/detectmobilebrowser.js"

;(function($){
    $.pgwBrowser = function() {

        var pgwBrowser = {};
        pgwBrowser.userAgent = navigator.userAgent;
        pgwBrowser.device = {};
        pgwBrowser.display = {};
        pgwBrowser.viewport = {};
        pgwBrowser.browser = {};
        pgwBrowser.os = {};
        resizeEvent = null;

        // The order of the following arrays is important, be careful if you change it.

        var browserData = [
            { name: 'Edge',              group: 'Edge',     identifier: 'Edge/([0-9\.]*)',          versionIdentifier: 'Edge/([0-9\.]*)' },
            { name: 'Chromium',          group: 'Chrome',   identifier: 'Chromium/([0-9\.]*)'       },
            { name: 'Chrome Mobile',     group: 'Chrome',   identifier: 'Chrome/([0-9\.]*) Mobile', versionIdentifier: 'Chrome/([0-9\.]*)'},
            { name: 'Chrome',            group: 'Chrome',   identifier: 'Chrome/([0-9\.]*)'         },
            { name: 'Chrome for iOS',    group: 'Chrome',   identifier: 'CriOS/([0-9\.]*)'          },
            { name: 'Android Browser',   group: 'Chrome',   identifier: 'CrMo/([0-9\.]*)'           },
            { name: 'Firefox',           group: 'Firefox',  identifier: 'Firefox/([0-9\.]*)'        },
            { name: 'Opera Mini',        group: 'Opera',    identifier: 'Opera Mini/([0-9\.]*)'     },
            { name: 'Opera',             group: 'Opera',    identifier: 'Opera ([0-9\.]*)'          },
            { name: 'Opera',             group: 'Opera',    identifier: 'Opera/([0-9\.]*)',         versionIdentifier: 'Version/([0-9\.]*)' },
            { name: 'Opera',             group: 'Opera',    identifier: 'OPR/([0-9\.]*)',           versionIdentifier: 'OPR/([0-9\.]*)' },
            { name: 'IEMobile',          group: 'Explorer', identifier: 'IEMobile/([0-9\.]*)'       },
            { name: 'Internet Explorer', group: 'Explorer', identifier: 'MSIE ([a-zA-Z0-9\.]*)'     },
            { name: 'Internet Explorer', group: 'Explorer', identifier: 'Trident/([0-9\.]*)',       versionIdentifier: 'rv:([0-9\.]*)' },
            { name: 'Safari',            group: 'Safari',   identifier: 'Safari/([0-9\.]*)',        versionIdentifier: 'Version/([0-9\.]*)' }
        ];

        var osData = [
            { name: 'Windows 2000',           group: 'Windows',       identifier: 'Windows NT 5.0',                     version: '5.0' },
            { name: 'Windows XP',             group: 'Windows',       identifier: 'Windows NT 5.1',                     version: '5.1' },
            { name: 'Windows Vista',          group: 'Windows',       identifier: 'Windows NT 6.0',                     version: '6.0' },
            { name: 'Windows 7',              group: 'Windows',       identifier: 'Windows NT 6.1',                     version: '7.0' },
            { name: 'Windows 8',              group: 'Windows',       identifier: 'Windows NT 6.2',                     version: '8.0' },
            { name: 'Windows 8.1',            group: 'Windows',       identifier: 'Windows NT 6.3',                     version: '8.1' },
            { name: 'Windows 10',             group: 'Windows',       identifier: 'Windows NT 10.0',                    version: '10.0' },
            { name: 'Windows Phone',          group: 'Windows Phone', identifier: 'Windows Phone ([0-9\.]*)'            },
            { name: 'Windows Phone',          group: 'Windows Phone', identifier: 'Windows Phone OS ([0-9\.]*)'         },
            { name: 'Windows',                group: 'Windows',       identifier: 'Windows'                             },
            { name: 'Chrome OS',              group: 'Chrome OS',     identifier: 'CrOS'                                },
            { name: 'Android',                group: 'Android',       identifier: 'Android',                            versionIdentifier: 'Android ([a-zA-Z0-9\.-]*)' },
            { name: 'iPad',                   group: 'iOS',           identifier: 'iPad',                               versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '[_|\.]' },
            { name: 'iPod',                   group: 'iOS',           identifier: 'iPod',                               versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '[_|\.]' },
            { name: 'iPhone',                 group: 'iOS',           identifier: 'iPhone OS',                          versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Sierra',        group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])12\.([0-9_\.]*))', versionSeparator: '[_|\.]' },
            { name: 'Mac OS X El Capitan',    group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])11\.([0-9_\.]*))', versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Yosemite',      group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])10\.([0-9_\.]*))', versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Mavericks',     group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])9\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Mountain Lion', group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])8\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Lion',          group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])7\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Snow Leopard',  group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])6\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Leopard',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])5\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Tiger',         group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])4\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Panther',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])3\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Jaguar',        group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])2\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Puma',          group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])1\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS X Cheetah',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|\.])0\.([0-9_\.]*))',  versionSeparator: '[_|\.]' },
            { name: 'Mac OS',                 group: 'Mac OS',        identifier: 'Mac OS'                              },
            { name: 'Ubuntu',                 group: 'Linux',         identifier: 'Ubuntu',                             versionIdentifier: 'Ubuntu/([0-9\.]*)' },
            { name: 'Debian',                 group: 'Linux',         identifier: 'Debian'                              },
            { name: 'Gentoo',                 group: 'Linux',         identifier: 'Gentoo'                              },
            { name: 'Linux',                  group: 'Linux',         identifier: 'Linux'                               },
            { name: 'BlackBerry',             group: 'BlackBerry',    identifier: 'BlackBerry'                          }
        ];

        //  Set browser data
        var setBrowserData = function() {
            var userAgent = pgwBrowser.userAgent.toLowerCase();

            // Check browser type
            for (i in browserData) {
                var browserRegExp = new RegExp(browserData[i].identifier.toLowerCase());
                var browserRegExpResult = browserRegExp.exec(userAgent);

                if (browserRegExpResult != null && browserRegExpResult[1]) {
                    pgwBrowser.browser.name = browserData[i].name;
                    pgwBrowser.browser.group = browserData[i].group;

                    // Check version
                    if (browserData[i].versionIdentifier) {
                        var versionRegExp = new RegExp(browserData[i].versionIdentifier.toLowerCase());
                        var versionRegExpResult = versionRegExp.exec(userAgent);

                        if (versionRegExpResult != null && versionRegExpResult[1]) {
                            setBrowserVersion(versionRegExpResult[1]);
                        }

                    } else {
                        setBrowserVersion(browserRegExpResult[1]);
                    }

                    break;
                }
            }

            return true;
        };

        // Set browser version
        var setBrowserVersion = function(version) {
            var splitVersion = version.split('.', 2);
            pgwBrowser.browser.fullVersion = version;

            // Major version
            if (splitVersion[0]) {
                pgwBrowser.browser.majorVersion = parseInt(splitVersion[0]);
            }

            // Minor version
            if (splitVersion[1]) {
                pgwBrowser.browser.minorVersion = parseInt(splitVersion[1]);
            }

            return true;
        };

        //  Set OS data
        var setOsData = function() {
            var userAgent = pgwBrowser.userAgent.toLowerCase();

            // Check browser type
            for (i in osData) {
                var osRegExp = new RegExp(osData[i].identifier.toLowerCase());
                var osRegExpResult = osRegExp.exec(userAgent);

                if (osRegExpResult != null) {
                    pgwBrowser.os.name = osData[i].name;
                    pgwBrowser.os.group = osData[i].group;

                    // Version defined
                    if (osData[i].version) {
                        setOsVersion(osData[i].version, (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');

                    // Version detected
                    } else if (osRegExpResult[1]) {
                        setOsVersion(osRegExpResult[1], (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');

                    // Version identifier
                    } else if (osData[i].versionIdentifier) {
                        var versionRegExp = new RegExp(osData[i].versionIdentifier.toLowerCase());
                        var versionRegExpResult = versionRegExp.exec(userAgent);

                        if (versionRegExpResult != null && versionRegExpResult[1]) {
                            setOsVersion(versionRegExpResult[1], (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');
                        }
                    }

                    break;
                }
            }

            return true;
        };

        // Set OS version
        var setOsVersion = function(version, separator) {
            if (separator.substr(0, 1) == '[') {
                var splitVersion = version.split(new RegExp(separator, 'g'), 2);
            } else {
                var splitVersion = version.split(separator, 2);
            }

            if (separator != '.') {
                version = version.replace(new RegExp(separator, 'g'), '.');
            }

            pgwBrowser.os.fullVersion = version;

            // Major version
            if (splitVersion[0]) {
                pgwBrowser.os.majorVersion = parseInt(splitVersion[0]);
            }

            // Minor version
            if (splitVersion[1]) {
                pgwBrowser.os.minorVersion = parseInt(splitVersion[1]);
            }

            return true;
        };

        // Set viewport size
        var setViewportSize = function(init) {
            pgwBrowser.viewport.width = $(window).width();
            pgwBrowser.viewport.height = $(window).height();

            // Resize triggers
            if (typeof init == 'undefined') {
                if (resizeEvent == null) {
                    $(window).trigger('PgwBrowser::StartResizing');
                } else {
                    clearTimeout(resizeEvent);
                }

                resizeEvent = setTimeout(function() {
                    $(window).trigger('PgwBrowser::StopResizing');
                    clearTimeout(resizeEvent);
                    resizeEvent = null;
                }, 300);
            }

            return true;
        };

        // Set device type (currently, mobile or desktop)
        var setDeviceData = function() {
          // Set device type and detect if mobile
          pgwBrowser.device.type = $.browser.mobile ? 'mobile' : 'desktop';
          pgwBrowser.device.mobile = $.browser.mobile;

          // Set display properties
          pgwBrowser.display.touch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

          var devicePixelRatio = window.devicePixelRatio.round(2);
          var imageSizeMultiplier = Math.round(devicePixelRatio)-1 || 1;

          pgwBrowser.display.hires = devicePixelRatio >= 1.3;
          pgwBrowser.display.retina = devicePixelRatio == 2;
          pgwBrowser.display.pixelRatio = devicePixelRatio;
          pgwBrowser.display.imageSizeMultiplier = Math.round(devicePixelRatio);

        }

        // Set viewport orientation
        var setViewportOrientation = function() {
            if (typeof window.orientation == 'undefined') {

                if (pgwBrowser.viewport.width >= pgwBrowser.viewport.height) {
                    pgwBrowser.viewport.orientation = 'landscape';
                } else {
                    pgwBrowser.viewport.orientation = 'portrait';
                }

            } else {
                switch(window.orientation) {
                    case -90:
                    case 90:
                        pgwBrowser.viewport.orientation = 'landscape';
                        break;
                    default:
                        pgwBrowser.viewport.orientation = 'portrait';
                        break;
                }
            }

            // Orientation trigger
            $(window).trigger('PgwBrowser::OrientationChange');

            return true;
        };

        // Replace default value for the user-agent tester on pgwjs.com
        if (typeof window.pgwJsUserAgentTester != 'undefined') {
            pgwBrowser.userAgent = window.pgwJsUserAgentTester;
        }

        // Initialization
        setBrowserData();
        setOsData();
        setViewportSize(true);
        setViewportOrientation();
        setDeviceData();

        // Triggers
        $(window).on('orientationchange', function(e) {
            setViewportOrientation();
        });

        $(window).resize(function(e) {
            setViewportSize();
        });

        return pgwBrowser;
    }
})(window.Zepto || window.jQuery);

/* Helper Functions */
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}


/** @preserve
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
 ;(function($){
(function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
})(window.Zepto || window.jQuery);
