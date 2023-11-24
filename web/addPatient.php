<div class="border border-primary rounded-3 d-flex flex-column align-items-center" style="margin:30px 20% 30px 20%;">
    <div class="border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2" style="height:10%; width:70%">
        <h2>Patient Information</h2>
    </div>

    <form action="post" action="">
        <div class="input-group mb-3">
            <span class="input-group-text">Fullname</span>
            <input type="text" class="form-control" placeholder="Fullname" name="name">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Phone number</span>
            <input type="text" class="form-control" placeholder="Phone" name="phone">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Gender</span>
            <div class="row" style="width: 80%;">
                <div class="col-lg-3" style="margin: 5px 0 5px 10px;">
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio1" name="gender" value="male" checked>
                        <label class="form-check-label" for="radio1">Male</label>
                    </div>
                </div>
                <div class="col-lg-3" style="margin: 5px 0 5px 0;">
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="radio2" name="gender" value="female">
                        <label class="form-check-label" for="radio2">Female</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Address</span>
            <input type="text" class="form-control" placeholder="Address" name="address">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Identity number</span>
            <input type="text" class="form-control" placeholder="Identity number" name="identity_number">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Comorbidity</span>
            <input type="text" class="form-control" placeholder="Comorbidity" name="comorbidity">
        </div>

        <div class="input-group d-flex justify-content-center mb-3">
            <button type="submit" class="btn btn-primary" style="width:80%;">Submit</button>
        </div>
    </form>
</div>