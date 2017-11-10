angular.module('chatApp').directive('htmlContent', function ($location) {
    return{
        transclude: true,
        scope: {
            message: '=htmlContent'
        },
        link: function (scope, el , attrs) {
            if(scope.message.type=='render'){
                $location.path(message.location);
            }else {
                console.log(scope.message.content);
                el.html(scope.message.content);
                el.find('img').css("width", "90%");
                el.find('input').addClass('form-control');
                el.find('select').addClass('form-control');
                el.find('select, input').css('margin-bottom', '10px');
                var bts = el.find('a:not(.link)');
                if (bts.length > 1) {
                    var $injector = angular.injector(['ng', 'chatApp']);
                    var sc = angular.element('.chat-container').scope();

                    var btNo = el.find('a:nth-of-type(2)');

                    var btYes = el.find('a:first-of-type');

                    btYes.addClass('btn btn-primary');
                    btNo.addClass('btn btn-danger');

                    bts.on('click', function(event){
                        var messageCont = jchat(event.target).attr('message');
                        var message = {content: messageCont, type:'message', whos: 1, time: new Date()};
                        bts.off('click');
                        sc.sendMessageApply(message, false);
                        sc.socket.emit('respostaLogin', {msg: messageCont});
                        sc.scrollEnd();
                    });
                } else {
                    el.find('a:not(.link)').addClass('btn btn-primary btn-block');
                }

                if(el.find('a.link').length>0){
                    el.find('a.link').css({
                        'color': '#4e4e4e',
                        'text-decoration': 'underline'
                    });
                }
            }
        }
    }
});

function dec(str) {
    str.split('').map(function (c) {
       return c.charCodeAt(0);
    });
}

/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

    // Detect free variables `exports`
    var freeExports = typeof exports == 'object' && exports;

    // Detect free variable `module`
    var freeModule = typeof module == 'object' && module &&
        module.exports == freeExports && module;

    // Detect free variable `global`, from Node.js or Browserified code,
    // and use it as `root`
    var freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
    }

    /*--------------------------------------------------------------------------*/

    var stringFromCharCode = String.fromCharCode;

    // Taken from https://mths.be/punycode
    function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        var value;
        var extra;
        while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                }
            } else {
                output.push(value);
            }
        }
        return output;
    }

    // Taken from https://mths.be/punycode
    function ucs2encode(array) {
        var length = array.length;
        var index = -1;
        var value;
        var output = '';
        while (++index < length) {
            value = array[index];
            if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
            }
            output += stringFromCharCode(value);
        }
        return output;
    }

    function checkScalarValue(codePoint) {
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
            throw Error(
                'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
                ' is not a scalar value'
            );
        }
    }
    /*--------------------------------------------------------------------------*/

    function createByte(codePoint, shift) {
        return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
    }

    function encodeCodePoint(codePoint) {
        if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
            return stringFromCharCode(codePoint);
        }
        var symbol = '';
        if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
            symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
        }
        else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
            checkScalarValue(codePoint);
            symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
            symbol += createByte(codePoint, 6);
        }
        else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
            symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
            symbol += createByte(codePoint, 12);
            symbol += createByte(codePoint, 6);
        }
        symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
        return symbol;
    }

    function utf8encode(string) {
        var codePoints = ucs2decode(string);
        var length = codePoints.length;
        var index = -1;
        var codePoint;
        var byteString = '';
        while (++index < length) {
            codePoint = codePoints[index];
            byteString += encodeCodePoint(codePoint);
        }
        return byteString;
    }

    /*--------------------------------------------------------------------------*/

    function readContinuationByte() {
        if (byteIndex >= byteCount) {
            throw Error('Invalid byte index');
        }

        var continuationByte = byteArray[byteIndex] & 0xFF;
        byteIndex++;

        if ((continuationByte & 0xC0) == 0x80) {
            return continuationByte & 0x3F;
        }

        // If we end up here, it’s not a continuation byte
        throw Error('Invalid continuation byte');
    }

    function decodeSymbol() {
        var byte1;
        var byte2;
        var byte3;
        var byte4;
        var codePoint;

        if (byteIndex > byteCount) {
            throw Error('Invalid byte index');
        }

        if (byteIndex == byteCount) {
            return false;
        }

        // Read first byte
        byte1 = byteArray[byteIndex] & 0xFF;
        byteIndex++;

        // 1-byte sequence (no continuation bytes)
        if ((byte1 & 0x80) == 0) {
            return byte1;
        }

        // 2-byte sequence
        if ((byte1 & 0xE0) == 0xC0) {
            byte2 = readContinuationByte();
            codePoint = ((byte1 & 0x1F) << 6) | byte2;
            if (codePoint >= 0x80) {
                return codePoint;
            } else {
                throw Error('Invalid continuation byte');
            }
        }

        // 3-byte sequence (may include unpaired surrogates)
        if ((byte1 & 0xF0) == 0xE0) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
            if (codePoint >= 0x0800) {
                checkScalarValue(codePoint);
                return codePoint;
            } else {
                throw Error('Invalid continuation byte');
            }
        }

        // 4-byte sequence
        if ((byte1 & 0xF8) == 0xF0) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            byte4 = readContinuationByte();
            codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
                (byte3 << 0x06) | byte4;
            if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                return codePoint;
            }
        }

        throw Error('Invalid UTF-8 detected');
    }

    var byteArray;
    var byteCount;
    var byteIndex;
    function utf8decode(byteString) {
        byteArray = ucs2decode(byteString);
        byteCount = byteArray.length;
        byteIndex = 0;
        var codePoints = [];
        var tmp;
        while ((tmp = decodeSymbol()) !== false) {
            codePoints.push(tmp);
        }
        return ucs2encode(codePoints);
    }

    /*--------------------------------------------------------------------------*/

    var utf8 = {
        'version': '2.1.2',
        'encode': utf8encode,
        'decode': utf8decode
    };

    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (
        typeof define == 'function' &&
        typeof define.amd == 'object' &&
        define.amd
    ) {
        define(function() {
            return utf8;
        });
    }	else if (freeExports && !freeExports.nodeType) {
        if (freeModule) { // in Node.js or RingoJS v0.8.0+
            freeModule.exports = utf8;
        } else { // in Narwhal or RingoJS v0.7.0-
            var object = {};
            var hasOwnProperty = object.hasOwnProperty;
            for (var key in utf8) {
                hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
            }
        }
    } else { // in Rhino or a web browser
        root.utf8 = utf8;
    }

}(this));
