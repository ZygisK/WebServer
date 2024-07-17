import {userModel, classModel, classInformationModel} from './models/userSchema.js'


//member CRUD
export async function insertMember(req, res)
{
    const user = req.body //get the user data from body via thunder client
    const newUser = new userModel(user);
    await newUser.save();

    //sending back to the client
    res.json(user);
}

export async function retrieveMember(req, res)
{
    try
    {
        const {unique_id} = req.params;
        const memberID = await userModel.findOne({unique_id: unique_id});

        if(memberID)
        {
            res.json(memberID);
        }
    } catch (error)
    {
        console.log(error);
    }
}

export async function editMember(req, res) {
    try {
        const { unique_id, title, first_name, last_name, email, premium } = req.body;

        const updatedUser = await userModel.findOneAndUpdate(
            { unique_id: unique_id }, //updating the id
            {
                $set: { //$set updates all the value below
                    title: title,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    premium: premium
                }
            },
            { new: true } //updates the values
        );

        if (!updatedUser)
        {
            return res.status(404).send({ message: "User not found." });
        }
        return res.send(updatedUser); //send back to client so thunderclient can load the updated user
    } 
    
    catch (error) {
        console.error('Error updating member', error);
        return res.status(500).send({ message: 'Failed to update user.' });
    }
}

export async function deleteMember(req, res)
{
    try {
        const { unique_id } = req.params;

        const deleteUser = await userModel.findOneAndDelete(
            {
                unique_id: unique_id,
            }
        )

        if(deleteUser)
        {
            res.status(200).send("User deleted");
        }
    } 
    
    catch (error)
    {
        console.log(error);
    }
}

//class CRUD
export async function insertClass(req, res)
{
    const class_body = req.body
    const newClass = await new classModel(class_body);
    await newClass.save();

    res.json(class_body);
}

export async function retrieveClass(req, res)
{
    try
    {
        const {class_id} = req.params;
        const classID = await classModel.findOne({class_id: class_id});

        if(classID)
        {
            res.json(classID);
        }
    } catch (error)
    {
        console.log(error);
    }
}

//edit class
export async function editClass(req, res)
{
    try {
        const { class_id, class_name, class_day, sessions_length, price, no_of_members } = req.body;

        const updateClass = await classModel.findOneAndUpdate(

        {class_id: class_id},
        {
            $set: {
                class_name: class_name,
                class_day: class_day,
                sessions_length: sessions_length,
                price: price,
                no_of_members: no_of_members
            }
        },
        {new: true}
    );

    if(!updateClass)
    {
        return res.status(404).send({message: "Class not found."});
    }

    return res.send(updateClass);

    } catch (error) {
        res.status(500).send({message: "Failed to update class."});
    }
}

export async function deleteClass(req, res)
{
    try {
        const {class_id} = req.params;

        const deleteClass = await classModel.findOneAndDelete(
        {
            class_id: class_id
        }
    )

    if(deleteClass)
    {
        res.status(200).send('Deleted a class')
    }

    } catch (error) {
        console.log(error);
    }
}

//information class

export async function createClassInformations(req, res)
{
    //const {user_id, class_id} = req.body
    const information = req.body;

    const createClassInfor = await new classInformationModel(information)
    await createClassInfor.save();

    res.json(information);
}

// export async function retrieveClassInformation(req, res)
// {
//     //const {member_unique_ids, class_ids} = req.body;
//     const { _id } = req.params;

//     const retrieveInfor = await classInformationModel.findById(_id);

//     if (retrieveInfor)
//     {
//         res.json(retrieveInfor);
//     } 
    
//     else
//     {
//         res.status(404).send("Information not found");
//     }
// }

export async function retrieveClassInformation(req, res)
{
    try {
        const allClassInfo = await classInformationModel.find({});
        res.json(allClassInfo);
    } catch (error) {
        console.error("Failed to retrieve class information", error);
        res.status(500).send("Failed to retrieve data");
    }
}


export async function editClassInformation(req, res)
{
    const { _id } = req.params;
    const {member_unique_ids, class_ids} = req.body;

    const updateClassInfor = await classInformationModel.findOneAndUpdate({
        _id
    },
    {
        $set: {
            member_unique_ids: member_unique_ids,
            class_ids: class_ids
        }
    },
    {new: true}
    );

    if(!updateClassInfor)
    {
        return res.status(404).send({message: "Information not found."});
    }

    return res.send(updateClassInfor);
}

export async function deteleClassInformation(req, res)
{
    const {_id} = req.params;

    const deleteUser = await classInformationModel.findOneAndDelete(
        {
            _id: _id,
        }
    )

    if(deleteUser)
    {
        res.status(200).send('Deleted class info object')
    }
}

