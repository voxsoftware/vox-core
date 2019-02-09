var System = core.System;
{
    var BinaryWriter = function BinaryWriter() {
        BinaryWriter.$constructor ? BinaryWriter.$constructor.apply(this, arguments) : BinaryWriter.$superClass && BinaryWriter.$superClass.apply(this, arguments);
    };
    BinaryWriter.$constructor = function (stream, encoding) {
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
    BinaryWriter.prototype.writeBoolean = function (value) {
        this.writeByte(value ? 1 : 0);
    };
    BinaryWriter.prototype.writeBooleanAsync = function (value) {
        return this.writeByteAsync(value ? 1 : 0);
    };
    BinaryWriter.prototype.writeByte = function (byte) {
        this.$stream.writeByte(byte);
    };
    BinaryWriter.prototype.writeByteAsync = function (byte) {
        return this.$stream.writeByteAsync(byte);
    };
    BinaryWriter.prototype.writeSbyte = function (sbyte) {
        this.$fbuf.writeInt8(sbyte, 0);
        this.$stream.write(this.$fbuf, 0, 1);
    };
    BinaryWriter.prototype.writeSbyteAsync = function (sbyte) {
        this.$fbuf.writeInt8(sbyte, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 1);
    };
    BinaryWriter.prototype.writeBytes = function (bytes, count) {
        count = arguments.length >= 2 ? count | 0 : bytes.length;
        this.$stream.write(bytes, 0, count);
    };
    BinaryWriter.prototype.writeBytesAsync = function (bytes, count) {
        count = arguments.length >= 2 ? count | 0 : bytes.length;
        return this.$stream.writeAsync(bytes, 0, count);
    };
    BinaryWriter.prototype.writeDouble = function (value) {
        this.$fbuf.writeDoubleLE(value, 0);
        this.$stream.write(this.$fbuf, 0, 8);
    };
    BinaryWriter.prototype.writeDoubleAsync = function (value) {
        this.$fbuf.writeDoubleLE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 8);
    };
    BinaryWriter.prototype.writeInt16 = function (value) {
        this.$fbuf.writeInt16LE(value, 0);
        this.$stream.write(this.$fbuf, 0, 2);
    };
    BinaryWriter.prototype.writeInt16Async = function (value) {
        this.$fbuf.writeInt16LE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 2);
    };
    BinaryWriter.prototype.writeUInt16 = function (value) {
        this.$fbuf.writeUInt16LE(value, 0);
        this.$stream.write(this.$fbuf, 0, 2);
    };
    BinaryWriter.prototype.writeUInt16Async = function (value) {
        this.$fbuf.writeUInt16LE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 2);
    };
    BinaryWriter.prototype.writeInt32 = function (value) {
        this.$fbuf.writeInt32LE(value, 0);
        this.$stream.write(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeInt32Async = function (value) {
        this.$fbuf.writeInt32LE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeUInt32 = function (value) {
        this.$fbuf.writeUInt32LE(value, 0);
        this.$stream.write(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeUInt32Async = function (value) {
        this.$fbuf.writeUInt32LE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeUIntSafe = function (value, fixedLength) {
        var num = value / 4294967295 | 0;
        var num2 = value % 4294967295;
        if (fixedLength) {
            this.$fbuf.writeUInt32LE(num);
            this.$stream.write(this.$fbuf, 0, 3);
        } else {
            this.write7BitEncodedInt(num);
        }
        this.writeUInt32(num2);
    };
    BinaryWriter.prototype.writeUIntSafeAsync = function callee$0$0(value, fixedLength) {
        var num, num2;
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    num = value / 4294967295 | 0;
                    num2 = value % 4294967295;
                    if (!fixedLength) {
                        context$1$0.next = 8;
                        break;
                    }
                    this.$fbuf.writeUInt32LE(num);
                    context$1$0.next = 6;
                    return regeneratorRuntime.awrap(this.$stream.writeAsync(this.$fbuf, 0, 3));
                case 6:
                    context$1$0.next = 9;
                    break;
                case 8:
                    this.write7BitEncodedInt(num);
                case 9:
                    context$1$0.next = 11;
                    return regeneratorRuntime.awrap(this.writeUInt32Async(num2));
                case 11:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryWriter.prototype.writeInt64 = function (value) {
        if (!(value instanceof System.Int64)) {
            throw new Error('El argumento value no es del tipo System.Int64');
        }
        this.$stream.write(value.toBuffer('le'), 0, 8);
    };
    BinaryWriter.prototype.writeInt64Async = function (value) {
        if (!(value instanceof System.Int64)) {
            throw new Error('El argumento value no es del tipo System.Int64');
        }
        return this.$stream.writeAsync(value.toBuffer('le'), 0, 8);
    };
    BinaryWriter.prototype.writeUInt64 = function (value) {
        if (!(value instanceof System.UInt64)) {
            throw new Error('El argumento value no es del tipo System.UInt64');
        }
        this.$stream.write(value.toBuffer('le'), 0, 8);
    };
    BinaryWriter.prototype.writeUInt64Async = function callee$0$0(value) {
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    if (value instanceof System.UInt64) {
                        context$1$0.next = 2;
                        break;
                    }
                    throw new Error('El argumento value no es del tipo System.UInt64');
                case 2:
                    return context$1$0.abrupt('return', this.$stream.writeAsync(value.toBuffer('le'), 0, 8));
                case 3:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    BinaryWriter.prototype.writeSingle = function (value) {
        this.$fbuf.writeFloatLE(value, 0);
        this.$stream.write(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeSingleAsync = function (value) {
        this.$fbuf.writeFloatLE(value, 0);
        return this.$stream.writeAsync(this.$fbuf, 0, 4);
    };
    BinaryWriter.prototype.writeDecimal = function (value) {
        System.Decimal.getBytes(value, this.$fbuf);
        this.$stream.write(this.$fbuf, 0, 16);
    };
    BinaryWriter.prototype.writeDecimalAsync = function (value) {
        System.Decimal.getBytes(value, this.$fbuf);
        return this.$stream.writeAsync(this.$fbuf, 0, 16);
    };
    BinaryWriter.prototype.writeString = function (value) {
        var buf = this.$encoding.getBytes(value);
        this.write7BitEncodedInt(buf.length);
        this.writeBytes(buf);
    };
    BinaryWriter.prototype.writeStringAsync = function (value) {
        var buf = this.$encoding.getBytes(value);
        this.write7BitEncodedInt(buf.length);
        return this.writeBytesAsync(buf);
    };
    BinaryWriter.prototype.write7BitEncodedInt = function (value) {
        var num;
        for (num = value; num >= 128; num = num >> 7) {
            this.writeByte((num | 128) & 255);
        }
        this.writeByte(num & 255);
    };
    BinaryWriter.prototype.writeAsync = function () {
        return this.write(arguments[0], arguments[1], true);
    };
    BinaryWriter.prototype.write = function (value, type, aSync) {
        if (type == undefined) {
            var t = typeof value;
            if (t == 'string') {
                type = t;
            } else if (t == 'number') {
                if (value | 0 === value) {
                    if (value > 2147483647) {
                        type = 'int64';
                        value = new System.Int64(value);
                    } else {
                        type = 'int32';
                    }
                } else {
                    if (value > 3.40282347e+38) {
                        type = 'double';
                    } else {
                        type = 'float';
                    }
                }
            } else if (t == 'boolean') {
                type = 'boolean';
            } else if (t instanceof System.Int64) {
                type = 'int64';
            } else if (t instanceof System.UInt64) {
                type = 'uint64';
            } else {
                throw new Error('No ha sido implementado aún la función write para tipo: ' + t);
            }
        }
        if (type == 'boolean') {
            return aSync ? this.writeBooleanAsync(value) : this.writeBoolean(value);
        } else if (type == 'byte') {
            return aSync ? this.writeByteAsync(value) : this.writeByte(value);
        } else if (type == 'bytes') {
            return aSync ? this.writeBytes(value) : this.writeBytes(value);
        } else if (type == 'double') {
            return aSync ? this.writeDoubleAsync(value) : this.writeBouble(value);
        } else if (type == 'int16') {
            return aSync ? this.writeInt16Async(value) : this.writeInt16(value);
        } else if (type == 'uint16') {
            return aSync ? this.writeUInt16Async(value) : this.writeUInt16(value);
        } else if (type == 'int32') {
            return aSync ? this.writeInt32Async(value) : this.writeInt32(value);
        } else if (type == 'uint32') {
            return aSync ? this.writeUInt32Async(value) : this.writeUInt32(value);
        } else if (type == 'int64') {
            return aSync ? this.writeInt64Async(value) : this.writeInt64(value);
        } else if (type == 'uint64') {
            return aSync ? this.writeUInt64Async(value) : this.writeUInt64(value);
        } else if (type == 'float' || type == 'single') {
            return aSync ? this.writeSingleAsync(value) : this.writeSingle(value);
        } else if (type == 'string') {
            return aSync ? this.writeStringAsync(value) : this.writeString(value);
        }
    };
    BinaryWriter.prototype.close = function () {
        this.$stream.close();
    };
}
exports.default = BinaryWriter;