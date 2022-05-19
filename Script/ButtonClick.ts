const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class ButtonClick extends cc.Component {

    start() {
        cc.find("Canvas/SignUpBtn").active = true;
        cc.find("Canvas/LogInBtn").active = true;
        cc.find("Canvas/Title").active = true;
        cc.find("Canvas/SignUpBox").active = false;
        cc.find("Canvas/LogInBox").active = false;
    }

    loadTextBox(event, customEventData) {
        cc.find("Canvas/SignUpBtn").active = false;
        cc.find("Canvas/LogInBtn").active = false;
        cc.find("Canvas/Title").active = false;
        if(customEventData == "SignUp") {
            cc.find("Canvas/SignUpBox").active = true;
        } else if(customEventData == "LogIn") {
            cc.find("Canvas/LogInBox").active = true;
        }
    }

    closeTextBox(event, customEventData) {
        if(customEventData == "SignUp") {
            cc.find("Canvas/SignUpBox").active = false;
        } else if(customEventData == "LogIn") {
            cc.find("Canvas/LogInBox").active = false;
        }
        cc.find("Canvas/SignUpBtn").active = true;
        cc.find("Canvas/LogInBtn").active = true;
        cc.find("Canvas/Title").active = true;
    }

    userSignUp(event, customEventData) {
        let email = cc.find("Canvas/SignUpBox/Email").getComponent(cc.EditBox).string;
        let userName = cc.find("Canvas/SignUpBox/UserName").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/SignUpBox/Password").getComponent(cc.EditBox).string;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const documentRef = firebase.database().ref("/user/" + email.replace(".", ""));
                documentRef.set({
                    userName: userName,
                    life: 5,
                    score: 0,
                    coin: 0,
                    historyScore: 0
                })
            }).then(() => {
                /*setErrMsg('');
                navigate('/');
                setLoading(false);*/
                cc.director.loadScene("StageSelect");
            })
            .catch((e) => {
                console.log(e);
                /*
                if(e.code == 'auth/email-already-in-use') {
                    setErrMsg('Email already in use.');
                } else if(e.code == 'auth/invalid-email') {
                    setErrMsg('Invalid email format.');
                } else if(e.code == 'auth/weak-password') {
                    setErrMsg('Weak password.');
                } else {
                    setErrMsg('Unknown error: ' + e.code);
                }
                */
            });
    }

    userLogIn(event, customEventData) {
        let email = cc.find("Canvas/LogInBox/Email").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/LogInBox/Password").getComponent(cc.EditBox).string;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            cc.director.loadScene("StageSelect");
        })
        .catch((e) => {
            console.log(e);
            /*if(e.code == 'auth/invalid-email') {
                setErrMsg('Invalid email format.');
            } else if(e.code == 'auth/user-not-found') {
                setErrMsg('User not found.');
            } else if(e.code == 'auth/wrong-password') {
                setErrMsg('Wrong password.');
            } else {
                setErrMsg('Unknown error: ' + e.code);
            }
            setLoading(false);
            */
        });
    }
}
