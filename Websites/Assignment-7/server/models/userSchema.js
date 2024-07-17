import mongoose from "mongoose";

const user_Schema = mongoose.Schema(
    {
        unique_id:
        {
            type: Number,
            unique: true, //no user will have the same id
        },

        title:
        {
            type: String,
            enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'], //you will get an error if you try to insert a title that is not in the enum
        },

        first_name:
        {
            type: String,
        },

        last_name:
        {
            type: String,
        },

        email:
        {
            type: String,
        },

        premium:
        {
            type: Boolean,
        },
    }
);

const class_Schema = mongoose.Schema(
    {
        class_id:
        {
            type: Number,
        },

        class_name:
        {
            type: String,
        },

        class_day:
        {
            type: String,
        },

        sessions_length:
        {
            type: Number, //integer for hours
        },

        //
        price:
        {
            type: Number,
        },

        no_of_members:
        {
            type: Number,
        },

        // member_ids: [{
        //     //get the type of member unique id not mongo id
        //     type: mongoose.Schema.Types.unique_id,
        //     //type: mongoose.Schema.Types.ObjectId,
        //     ref: 'member'
        // }]

        member_unique_ids:
        [{
            type: Number,
        }]
    }
);

const class_information_Schema = mongoose.Schema(
    {
        //links member of gym to several classes
        //gym members must take 3 classes

        member_unique_ids:
        [{
            //type: mongoose.Schema.Types.ObjectId,
            //ref: 'member'
            type: Number,
        }],

        class_ids:
        [{
            // type: mongoose.Schema.ObjectId,
            // ref: 'class'
            type: Number,
        }],
    }
)

//linking with unique id not the mongo built in id
class_Schema.virtual('members',
{
    ref: 'member',
    localField: 'member_unique_ids',
    foreignField: 'unique_id',
    justOne: false
})

class_information_Schema.virtual('classes',
{
    ref: 'class',
    localField: 'class_ids',
    foreignField: 'class_id',
    justOne: false
})

const userModel = mongoose.model('member', user_Schema);
const classModel = mongoose.model('class', class_Schema);
const classInformationModel = mongoose.model('class-information', class_information_Schema);

export { userModel, classModel, classInformationModel};
