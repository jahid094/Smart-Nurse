import React, {useState} from 'react';
import './CreatePatientForm.css'

const CreatePatientForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    
    const submitHandler = async (event) => {
        event.preventDefault()
    }

    return <React.Fragment>
        <div className="container-fluid bg-white">
            <div className="container">
                <div className="row py-5">
                    <div className="col-lg-8">
                        <form style={{color: '#757575'}} onSubmit={submitHandler}>
                            <div className="row">
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-left" placeholder="First name" name="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-left" placeholder="Last name" name="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="email" className="form-control text-left" placeholder="Email" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="tel" className="form-control text-left" placeholder="Phone Number" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                        
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-left" placeholder="Address" name="address" value={address} required onChange={(e) => setAddress(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-left" placeholder="Age" name="age" value={age} required onChange={(e) => setAge(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4 mb-4 mb-sm-0">
                                        <input type="text" className="form-control text-left" placeholder="Height" name="height" value={height} required onChange={(e) => setHeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-left" placeholder="Weight" name="weight" value={weight} required onChange={(e) => setWeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
				                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                    <button type="submit" className="btn btn-lg btn-block rounded-pill text-light" style={{backgroundColor: '#0C0C52'}} disabled = {(disable)? "disabled" : ""}>Create</button>
                                </div>
                                <div className="col-lg-4">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 form-background d-none d-lg-block">
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>;
};

export default CreatePatientForm;