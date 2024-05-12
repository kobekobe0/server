import { Schema } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    scanned: {
        type: [String],
        default: [],
    }
});

export default clientSchema;
