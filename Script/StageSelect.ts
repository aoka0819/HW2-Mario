// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class StageSelect extends cc.Component {
    @property
    label: cc.Label;

    // onLoad () {}

    start () {
        let key = firebase.auth().currentUser.email.replace(".", "");
        firebase.database().ref("user/" + key + "/userName").once('value', function(snapshot) {
            //this.label.string = snapshot.val();
            console.log(snapshot.val());
        });
    }

    // update (dt) {}
}
