let load = () => {
    var button_type
    var form1 = document.getElementById("register_form1")
    function handleForm1(event) {
        event.preventDefault()
        let myModal = new bootstrap.Modal(document.getElementById('exampleModal1'))
        myModal.show()
    }
    form1.addEventListener('submit', handleForm1)
    var form2 = document.getElementById("register_form2")
    function handleForm2(event) {
        event.preventDefault()
        let myModal = new bootstrap.Modal(document.getElementById('exampleModal1'))
        myModal.show()
    }
    form2.addEventListener('submit', handleForm2)


    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");
    const authBtn = document.getElementById("authBtn");
    const loginValidate = document.getElementById("loginValidate")

    loginBtn.addEventListener("click", (e) => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add("slide-up");
            } else {
                signupBtn.parentNode.classList.add("slide-up");
                parent.classList.remove("slide-up");
            }
        });
    });

    signupBtn.addEventListener("click", (e) => {
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add("slide-up");
            } else {
                loginBtn.parentNode.parentNode.classList.add("slide-up");
                parent.classList.remove("slide-up");
            }
        });
    });
    var cam_width = 450
    var cam_height = 300
    var condition = [[],[],[]]
    var condition_counter = 0
    var distance_between = []
    var finger = []
    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext("2d");
    var time_counter=5
    const register_text = document.getElementById("register_text");
    const timer_text = document.getElementById("timer_text");

    function onResults(results) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks) {
            results.multiHandLandmarks.forEach( function(landmarks, index, array) {
                // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5});
                // drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
                for(i = 0 ; i < 5; i++){
                    finger[i] = markFinger(landmarks,(i+1)*4)
                }
                for(i = 0 ; i < 4; i++){
                    distance_between[i] = Number(getDistance(finger[i], finger[i+1]).toFixed(0))
                }

                if(condition_counter >= condition.length){
                    condition_counter = 0
                }
            });
        }
        canvasCtx.restore();
    }


    const hands = new Hands({locateFile: (file) => {
		return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});
    var double_FA = false
    hands.setOptions({
		maxNumHands: 1,
		modelComplexity: 1,
		minDetectionConfidence: 0.5,
		minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);
    const camera = new Camera(videoElement, {
		onFrame: async () => {
			await hands.send({image: videoElement});

            if(double_FA == false && button_type == "register"){
                var timer = 5
                var this_interval = setInterval(() => {
                    if(timer > 0)
                    {
                        timer -= 1
                        time_counter -= 1
                        if(timer == 0){
                            register()
                            if((condition_counter+1) > 3){
                                clearInterval(this_interval)
                                doneRegister()
                            }
                            if(condition_counter >= 3){
                                condition_counter=0
                            }

                        }
                    }
                    else {	// Acciones cuando el tiempo acabe
                        timer = 5	// Reiniciar el contador
                        time_counter = 5

                    }
                    register_text.innerHTML = "Timer: "+time_counter
                    timer_text.innerHTML = "Reading gesture: "+(condition_counter+1)
                }, 1000)
                double_FA = true
            }
            else if (double_FA == false && button_type=="login"){
                var timer = 5
                var this_interval = setInterval(() => {
                    if(timer > 0)
                    {
                        timer -= 1
                        time_counter -= 1
                        if(timer == 0){
                            register()
                            if((condition_counter+1) > 3){
                                clearInterval(this_interval)
                                doneLogIn()

                            }
                            if(condition_counter >= 3){
                                condition_counter=0
                            }
                        }
                    }
                    else {	// Acciones cuando el tiempo acabe
                        timer = 5	// Reiniciar el contador
                        time_counter = 5

                    }
                    register_text.innerHTML = "Timer: "+time_counter
                    timer_text.innerHTML = "Reading gesture: "+(condition_counter+1)
                }, 1000)
                double_FA = true
            }



		},
		width: cam_width,
		height: cam_height
    });


    authBtn.onclick = () =>{
        camera.start();
        double_FA = false
        button_type = "register"
        console.log("register")

    }

    loginValidate.onclick = () =>{
        camera.start();
        double_FA = false
        button_type = "login"
        console.log("login")


    }

    cancelBtn.onclick = () =>{
        window.location = ".";
        clearInterval()
    }


    document.addEventListener("keydown", event => {
        if(event.code == 'KeyR'){
            // clearInterval()
            // setInterval(register, 2000)
            register()
        }
        if(event.code == 'KeyC'){
            // clearInterval()
            setInterval(doneLogIn, 300)
        }


     });


    // function putText(){
    //     canvasCtx.beginPath();
    //     canvasCtx.fillStyle = "rgba(0, 100, 255, 0.7)";
    //     canvasCtx.font = "30px Arial";
    //     canvasCtx.fillText(condition_counter, 40, 40);
    //     canvasCtx.stroke();

    // }
    // function putTimer(){
    //     canvasCtx.beginPath();
    //     canvasCtx.fillStyle = "rgba(0, 100, 255, 0.7)";
    //     canvasCtx.font = "10px Arial";
    //     canvasCtx.fillText("Se registrará el gesto en: "+time_counter, 40, 70);
    //     canvasCtx.stroke();

    // }

    function markFinger(landmarks, finger){
        canvasCtx.beginPath();
        canvasCtx.fillStyle = "rgba(0, 255, 0, 1)";

        canvasCtx.arc(landmarks[finger].x*cam_width, landmarks[finger].y*cam_height, 11, 0, 2 * Math.PI);
        canvasCtx.stroke();
        return [landmarks[finger].x*cam_width, landmarks[finger].y*cam_height]
    }

    function register(){
        for(i = 0;i < 3; i++){
            condition[condition_counter][i] = distance_between[i]/distance_between[i+1]
        }
        condition_counter+=1
        console.log("Registrado: "+condition_counter)
    }


    function getDistance(finger1, finger2){
        let [x1,y1] = finger1
        let [x2,y2] = finger2
        canvasCtx.beginPath();
        canvasCtx.fillStyle = "rgba(0, 255, 0, 1)";
        canvasCtx.moveTo(x1, y1);
        canvasCtx.lineTo(x2, y2);
        canvasCtx.stroke();
        return Math.hypot(x2-x1, y2-y1)

    }
    function validateGesture(group_condition){
        // console.log(typeof(distance_between[0]) + "  " + typeof(condition[0]))
        var accept = true
        for(i = 0;i < 3; i++){
            if(!validate(distance_between[i]/distance_between[i+1], group_condition[condition_counter][i]) ){
                accept = false
            }
        }
        if(accept == true){
            condition_counter+=1
        }
        return accept
    }
    function validate(input_try, condition_input){
        let tolerance = .5
        // console.log(typeof(input_try) + "  " + typeof(condition_input))
        // console.log(input_try+"<"+(condition_input + tolerance))
        // console.log(input_try+">"+(condition_input - tolerance))
        if(input_try < condition_input + tolerance && input_try > condition_input - tolerance){
            return true
        }else{
            return false
        }
    }








    function doneRegister(){
        let register_form = new FormData()
        register_form.append("user",document.getElementById("validationCustom01").value)
        register_form.append("password",document.getElementById("validationCustom02").value)
        register_form.append("first_doubleFA", '{"first":'+condition[0][0]+',"second":'+condition[0][1]+',"third":'+condition[0][2]+'}')
        register_form.append("second_doubleFA", '{"first":'+condition[1][0]+',"second":'+condition[1][1]+',"third":'+condition[1][2]+'}')
        register_form.append("third_doubleFA", '{"first":'+condition[2][0]+',"second":'+condition[2][1]+',"third":'+condition[2][2]+'}')
        // console.log(register_form.get("user"))
        // console.log(register_form.get("password"))
        // console.log(register_form.get("first_doubleFA"))
        // console.log(register_form.get("second_doubleFA"))
        // console.log(register_form.get("third_doubleFA"))
        var object = {};
        register_form.forEach((value, key) => {object[key] = value});
        var json_send = JSON.stringify(object);

        fetch('./services/createuser.php/', {
            method: 'POST',
            body: json_send
        }).then(
            response => response.json()
        ).then(
            response => {
                window.location = "./kungfupandi.php";


            }
        ).catch(
            error => console.log(error)
        )


    }




    function doneLogIn(){
        let register_form = new FormData()
        register_form.append("user",document.getElementById("validationCustom03").value)
        register_form.append("password",document.getElementById("validationCustom04").value)
        // console.log(register_form.get("user"))
        // console.log(register_form.get("password"))
        var object = {};
        register_form.forEach((value, key) => {object[key] = value});
        var json_send = JSON.stringify(object);

        fetch('./services/readuser.php/', {
            method: 'POST',
            body: json_send
        }).then(
            response => response.json()
        ).then(
            response => {
                var accept = true
                condition_counter = 0
                for(i = 0; i<3;i++){
                    console.log("'"+response[i]+"'")
                    var original_condition = JSON.parse(response[i]);
                    var check_condition = [[],[]]
                    check_condition[i][0] = original_condition['first']
                    check_condition[i][1] = original_condition['second']
                    check_condition[i][2] = original_condition['third']
                    // console.log(original_condition['first'],original_condition['second'],original_condition['third'])
                    if(!validateGesture(check_condition)){
                        accept = false
                    }
                }
                if(accept == true){
                    window.location = "./kungfupandi.php";
                    console.log("SUCCESS")
                }else{
                    window.location = ".";
                    console.log("FAILED")
                }
              


            }
        ).catch(
            error => console.log(error)
        )


     
    }







}
addEventListener("DOMContentLoaded", load)
