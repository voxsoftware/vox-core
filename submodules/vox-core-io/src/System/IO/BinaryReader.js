var System = core.System;
{
    var BinaryReader = function BinaryReader() {
        BinaryReader.$constructor ? BinaryReader.$constructor.apply(this, arguments) : BinaryReader.$superClass && BinaryReader.$superClass.apply(this, arguments);
    };
    BinaryReader.$constructor = function (stream, encoding) {
        if (!(stream instanceof System.IO.Stream)) {
            throw new Error('El argumento stream debe ser del tipo System.IO.Stream');
        }
        this.$stream = stream;
        this.baseStream = stream;
        this.$fbuf = new Buffer(16);
        if (!encoding) {
            encoding = System.Text.Encoding.utf8;
        }
        this.$encoding = this.encoding = encoding;
    };
    BinaryReader.prototype.readByte = function () {
        if (this.$stream.read(this.$fbuf, 0, 1) < 1) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf[0];
    };
    BinaryReader.prototype.readByteAsync = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 1));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 1)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf[0]);
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readBoolean = function () {
        return !!this.readByte();
    };
    BinaryReader.prototype.readBooleanAsync = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.readByte());
                case 2:
                    return context$1$0.abrupt('return', !!context$1$0.sent);
                case 3:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readSbyte = function () {
        if (this.$stream.read(this.$fbuf, 0, 1) < 1) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readInt8(0);
    };
    BinaryReader.prototype.readSbyteAsync = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 1));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 1)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readInt8(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readBytes = function (count) {
        var buf = new Buffer(count);
        if (this.$stream.read(buf, 0, count) < count) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return buf;
    };
    BinaryReader.prototype.readBytesAsync = function callee$0$0(count) {
        var buf;
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    buf = new Buffer(count);
                    context$1$0.next = 3;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(buf, 0, count));
                case 3:
                    context$1$0.t0 = context$1$0.sent;
                    context$1$0.t1 = count;
                    if (!(context$1$0.t0 < context$1$0.t1)) {
                        context$1$0.next = 7;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 7:
                    return context$1$0.abrupt('return', buf);
                case 8:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readUIntSafe = function (fixedLength) {
        var num1, num2;
        if (fixedLength) {
            if (this.$stream.read(this.$fbuf, 0, 7) < 7) {
                throw new Error('Se intentó leer más allá de la longitud');
            }
            this.$fbuf[7] = this.$fbuf[3];
            this.$fbuf[3] = 0;
            num1 = this.$fbuf.readUInt32LE(0);
            this.$fbuf[3] = this.$fbuf[7];
            num2 = this.$fbuf.readUInt32LE(3);
        } else {
            num1 = this.read7BitEncodedInt();
            num2 = this.readUInt32();
        }
        return num1 * 4294967295 + num2;
    };
    BinaryReader.prototype.readUIntSafeAsync = function callee$0$0(fixedLength) {
        var num1, num2;
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    if (!fixedLength) {
                        context$1$0.next = 13;
                        break;
                    }
                    context$1$0.next = 3;
                    return regeneratorRuntime.awrap(this.$stream.read(this.$fbuf, 0, 7));
                case 3:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 7)) {
                        context$1$0.next = 6;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 6:
                    this.$fbuf[7] = this.$fbuf[3];
                    this.$fbuf[3] = 0;
                    num1 = this.$fbuf.readUInt32LE(0);
                    this.$fbuf[3] = this.$fbuf[7];
                    num2 = this.$fbuf.readUInt32LE(3);
                    context$1$0.next = 17;
                    break;
                case 13:
                    num1 = this.read7BitEncodedInt();
                    context$1$0.next = 16;
                    return regeneratorRuntime.awrap(this.readUInt32Async());
                case 16:
                    num2 = context$1$0.sent;
                case 17:
                    return context$1$0.abrupt('return', num1 * 4294967295 + num2);
                case 18:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readDouble = function () {
        if (this.$stream.read(this.$fbuf, 0, 8) < 8) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readDoubleLE(0);
    };
    BinaryReader.prototype.readDoubleAsyn = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 8));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 8)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readDoubleLE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readInt16 = function () {
        if (this.$stream.read(this.$fbuf, 0, 2) < 2) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readInt16LE(0);
    };
    BinaryReader.prototype.readInt16Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 2));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 2)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readInt16LE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readUInt16 = function () {
        if (this.$stream.read(this.$fbuf, 0, 2) < 2) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readUInt16LE(0);
    };
    BinaryReader.prototype.readUInt16Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 2));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 2)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readUInt16LE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readInt32 = function () {
        if (this.$stream.read(this.$fbuf, 0, 4) < 4) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readInt32LE(0);
    };
    BinaryReader.prototype.readInt32Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 4));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 4)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readInt32LE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readUInt32 = function () {
        if (this.$stream.read(this.$fbuf, 0, 4) < 4) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readUInt32LE(0);
    };
    BinaryReader.prototype.readUInt32Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.read(this.$fbuf, 0, 4));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 4)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readUInt32LE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readInt64 = function () {
        if (this.$stream.read(this.$fbuf, 0, 8) < 8) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return new System.Int64(this.$fbuf, 'le');
    };
    BinaryReader.prototype.readInt64Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 8));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 8)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', new System.Int64(this.$fbuf, 'le'));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readUInt64 = function () {
        if (this.$stream.read(this.$fbuf, 0, 8) < 8) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return new System.UInt64(this.$fbuf, 'le');
    };
    BinaryReader.prototype.readUInt64Async = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 8));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 8)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', new System.UInt64(this.$fbuf, 'le'));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readSingle = function () {
        if (this.$stream.read(this.$fbuf, 0, 4) < 4) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return this.$fbuf.readFloatLE(0);
    };
    BinaryReader.prototype.readSingleAsync = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 4));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 4)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', this.$fbuf.readFloatLE(0));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.readDecimal = function () {
        if (this.$stream.read(this.$fbuf, 0, 16) < 16) {
            throw new Error('Se intentó leer más allá de la longitud');
        }
        return System.Decimal.fromBytes(this.$fbuf);
    };
    BinaryReader.prototype.readDecimalAsync = function callee$0$0() {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    context$1$0.next = 2;
                    return regeneratorRuntime.awrap(this.$stream.readAsync(this.$fbuf, 0, 16));
                case 2:
                    context$1$0.t0 = context$1$0.sent;
                    if (!(context$1$0.t0 < 16)) {
                        context$1$0.next = 5;
                        break;
                    }
                    throw new Error('Se intentó leer más allá de la longitud');
                case 5:
                    return context$1$0.abrupt('return', System.Decimal.fromBytes(this.$fbuf));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.read7BitEncodedInt = function () {
        var num = 0, num2 = 0;
        while (num2 != 35) {
            var b = this.readByte();
            num |= (b & 127 | 0) << num2;
            num2 += 7;
            if ((b & 128) == 0) {
                return num;
            }
        }
        throw new Error('Se esperaba un número entero codificado en 7 bit.');
    };
    BinaryReader.prototype.readString = function () {
        var len = this.read7BitEncodedInt();
        return this.$encoding.getString(this.readBytes(len));
    };
    BinaryReader.prototype.readStringAsync = function callee$0$0() {
        var len;
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    len = this.read7BitEncodedInt();
                    context$1$0.t0 = this.$encoding;
                    context$1$0.next = 4;
                    return regeneratorRuntime.awrap(this.readBytes(len));
                case 4:
                    context$1$0.t1 = context$1$0.sent;
                    return context$1$0.abrupt('return', context$1$0.t0.getString.call(context$1$0.t0, context$1$0.t1));
                case 6:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryReader.prototype.close = function () {
        this.$stream.close();
    };
}
exports.default = BinaryReader;