import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    photoUrl: {
      type: String,
    }
    ,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  }, {
  timestamps: true
}
)

const UserModel = model<TUser>('User', userSchema)
export default UserModel;
