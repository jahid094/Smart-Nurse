import React, {useState} from 'react';
import Checkmark from '../shared/img/checkmark.png'
import Cross from '../shared/img/Cross.png'
import Alert from 'react-bootstrap/Alert'

const NotificationAlert = () => {
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [show3, setShow3] = useState(true);
    const [show4, setShow4] = useState(true);
    return <React.Fragment>
        <div class="container-fluid">
            <div class="container">
                {
                    show ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                        <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                        <div class="btn-group float-right" role="group" aria-label="Basic example">
                            <button class="btn " data-dismiss="alert" onClick={() => setShow(false)}>
                                <img src={Checkmark} style={{width: '22px', height: '22px'}}/>
                            </button>
                            <button class="btn " data-dismiss="alert" onClick={() => setShow(false)}>
                                <img src={Cross} style={{width: '16px', height: '16px'}}/>
                            </button>
                        </div>
                    </Alert>
                    :
                    null
                }
                {
                    show1 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to eat 2 apples at 7 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow1(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}}/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow1(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}}/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show2 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to walk for 45 mins at 5 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow2(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}}/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow2(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}}/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show3 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow3(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}}/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow3(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}}/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show4 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow4(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}}/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow4(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}}/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
			</div>
		</div>  
    </React.Fragment>;
};

export default NotificationAlert;