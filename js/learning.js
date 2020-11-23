// CRUD

// create: tạo document
function addData() {
    firebase.firestore().collection('users').add({
        name: "Chinh",
        email: "lung@gmail.com",
        password: "12345678"
    });
}
// addData();

// read
async function readAllData() {
    let data = await firebase.firestore().collection('users').get();
    let parseData =  data.docs.map(function(doc) {
        let dataDoc = doc.data();
        // dataDoc.id = doc.id;
        dataDoc = {...dataDoc, name : dataDoc.name + "AHIHI"};

        // console.log(dataDoc);
        return dataDoc;
        // return doc.data();
    })
    console.log(parseData);
}
// readAllData();

async function searchUserByName(keyword) {
    let data = await firebase.firestore().collection("users")
                .where("name","==",keyword)
                .get();
    console.log(data);
}
// searchUserByName("Chinh")

async function findOneUser(id) {
    let data = await firebase.firestore().collection("users").doc(id).get();
    console.log({...data.data(), id});
}
// findOneUser("AgB5xba5TMWV30koXnrU")


// update
async function updateUserName(id , data) {
    try {
       let dataParse = await firebase.firestore().collection("users").doc(id).update({
            name : data
       })
       console.log(dataParse.data());
    } catch (error) {
        console.log(error.message);
    }
}
// updateUserName("AgB5xba", "Vân")

async function removeUser(id) {
    try {
       let dataParse = await firebase.firestore()
                        .collection("users")
                        .doc(id)
                        .delete()
    } catch (error) {
        console.log(error.message);
    }
   
   
}
removeUser("AgB5xba5TMWV30koXnrU")

// delete