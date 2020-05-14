import React, {useState} from 'react';
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
                    <Alert onClose={() => setShow(false)} dismissible style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fa fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>
                    You have to take 1 piece Napa tablet at 8:00 PM.
                    <button class="btn float-right" data-dismiss="alert" onClick={() => setShow(false)}>
						<i class="fa fa-check"></i>
					</button>
                    </Alert>
                    :
                    null
                }
                {
                    show1 ?
                    <Alert onClose={() => setShow1(false)} dismissible style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fa fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>
                    You have to eat 2 apples at 7 PM.
                    <button class="btn float-right" data-dismiss="alert" onClick={() => setShow1(false)}>
						<i class="fa fa-check"></i>
					</button>
                    </Alert>
                    :
                    null
                }
                {
                    show2 ?
                    <Alert onClose={() => setShow2(false)} dismissible style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fa fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>
                    You have to walk for 45 mins at 5 PM.
                    <button class="btn float-right" data-dismiss="alert" onClick={() => setShow2(false)}>
						<i class="fa fa-check"></i>
					</button>
                    </Alert>
                    :
                    null
                }
                {
                    show3 ?
                    <Alert onClose={() => setShow3(false)} dismissible style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fa fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>
                    You have to take 1 piece Napa tablet at 8:00 PM.
                    <button class="btn float-right" data-dismiss="alert" onClick={() => setShow3(false)}>
						<i class="fa fa-check"></i>
					</button>
                    </Alert>
                    :
                    null
                }
                {
                    show4 ?
                    <Alert onClose={() => setShow4(false)} dismissible style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fa fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>
                    You have to take 1 piece Napa tablet at 8:00 PM.
                    <button class="btn float-right" data-dismiss="alert" onClick={() => setShow4(false)}>
						<i class="fa fa-check"></i>
					</button>
                    </Alert>
                    :
                    null
                }
			</div>
		</div>  
    </React.Fragment>;
};

export default NotificationAlert;