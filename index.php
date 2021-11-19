<!DOCTYPE html>
<html lang="en" >
<head>
	<!-- <script>
		if ( window.history.replaceState ) {
			window.history.replaceState( null, null, window.location.href );
		}
	</script> -->
	<meta charset="UTF-8">
	<title>Kung Fu Pandi</title>

	<script src="./js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="./css/bootstrap.min.css">

	<link rel="stylesheet" href="./css/style.css">
	<script src="./js/handsfree.js"></script>
   
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>

	
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.9/dist/sweetalert2.all.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

	<script  src="./js/script.js"></script>

</head>	
<body>


	<video class="input_video" hidden></video>

	<div class="form-structor">
			<div class="signup">
				<div class="title">
					<h2 class="form-title" id="signup">Register</h2>
				</div>
				<form id="register_form1">
					<div class="form-holder">
						<input type="text" id="validationCustom01" name="user" class="input"  placeholder="User" required />
						<input type="password" id="validationCustom02" name="password"  class="input" placeholder="Password" required />

					</div>
					<div class="alignCenter">
						<br><br>
						<button id="authBtn" type="submit" class="btn btn-primary">
							Register
						</button>
					</div>
				</div>
			</form>


			<form id="register_form2">
				<div class="login slide-up">
					<div class="center">
						<h2 class="form-title"  id="login" ><span>or</span>Log In</h2>
						<div class="form-holder">
							<input type="text" id="validationCustom03" class="input" placeholder="User" required />
							<input type="password" id="validationCustom04" class="input" placeholder="Password" required/>
						</div>
						<div class="alignCenter">
							<br><br>
							<button id="loginValidate" type="submit" class="btn btn-primary">
								Log In
							</button>
					</div>
					</div>
				</div>
			</form>

	</div>



<!-- Modal-->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Register: double factor authentication</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<div class="container">
			<video class="input_video" hidden></video>
			<canvas class="output_canvas" width="450%" height="300%"></canvas>
			<div class="alignCenter">
				<div id="register_text">Timer: 5</div>
				<div id="timer_text">Reading gesture: 1</div>

			</div>

		</div>
      </div>
      <div class="modal-footer">
        <button type="button" id="cancelBtn" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>



</body>
<footer>
	


</footer>
</html>