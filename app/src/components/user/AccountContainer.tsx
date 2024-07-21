import AccountHeaderDesktop from "./AccountHeaderDesktop";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faImage, faUser, faAddressCard} from "@fortawesome/free-solid-svg-icons"
import Card from 'react-bootstrap/Card';
import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {User} from "../../types/user.type";
import {Gender} from "../../constants/gender.constant";
import {useNavigate} from "react-router-dom";
import {PathNamesConstant} from "../../constants/pathNames.constant";
// import {useAuth} from "../../context/UserContext";

const AccountContainer = () => {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const handleCloseEditProfile = () => setShowEditProfileModal(false)
    // const handleShowEditProfileModal = () => setShowEditProfileModal(true);
    // const { authState } = useAuth();
    // const { user } = authState;
    const {user: userFromStore} = useSelector((state: RootState) => state.users);
    const userFromLocalStorage = localStorage.getItem('user')
    const user = userFromStore ? userFromStore : JSON.parse(userFromLocalStorage!) as User;
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate(PathNamesConstant.home)
        }
    }, [user])

    return (
        <>
            {
                user &&
                <>
                    <div className='page-container'>
                        <AccountHeaderDesktop user={user}/>
                        <div className="main-content">
                            <div className="section__content section__content--p30">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="overview-wrap mb-4 d-flex align-items-center"
                                                 style={{rowGap: '1rem'}}>
                                                <h2 className="font-weight-bold"><FontAwesomeIcon icon={faUser}
                                                                                                  className="mr-1"/> Thông tin
                                                    tài khoản</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <Card className="text-center p-0 mb-4 mb-xl-0 overview-item overflow-hidden">
                                                <Card.Header className={"font-weight-bold bg-dark text-white"}
                                                             style={{fontSize: '1.2rem'}}>
                                                    <FontAwesomeIcon icon={faImage} className='mr-1'/> Ảnh đại diện
                                                </Card.Header>
                                                <Card.Body>
                                                    {
                                                        user.avatar ?
                                                            <img className="img-account-profile rounded-circle mb-2" src={user.avatar}/> :
                                                            <FontAwesomeIcon className="img-account-profile rounded-circle mb-2" style={{fontSize: '24rem'}} icon={faCircleUser}/>
                                                    }
                                                    <Button className="d-block btn btn-primary mt-4 mx-auto"><strong>Tên người dùng:</strong> {user.username}</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="col-xl-8">
                                            <Card className="p-0 mb-4 mb-xl-0 overview-item overflow-hidden">
                                                <Card.Header className={"font-weight-bold bg-dark text-white text-center"}
                                                             style={{fontSize: '1.2rem'}}>
                                                    <FontAwesomeIcon icon={faAddressCard} className='mr-1'/> Hồ sơ cá nhân
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="row">
                                                        <FormGroup className="col mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Họ và
                                                                tên</Form.Label>
                                                            <Form.Control type='text' disabled value={user?.fullName}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="row">
                                                        <FormGroup className="col-md-6 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Ngày
                                                                sinh</Form.Label>
                                                            <Form.Control type='date' disabled className="form-control"
                                                                          value={new Date(user.birthDate!).toISOString().split('T')[0]}/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-6 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Giới
                                                                tính</Form.Label>
                                                            <Form.Select disabled className={"form-control"}>
                                                                {
                                                                    Object.values(Gender).map((gender,index) => (
                                                                        <option key={index} selected={gender.value === user.gender} value={gender.value}>{gender.label}</option>
                                                                    ))
                                                                }
                                                            </Form.Select>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="row">
                                                        <FormGroup className="col-md-6 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Số điện
                                                                thoại</Form.Label>
                                                            <Form.Control type='text' disabled value={user?.phone}/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-6 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Địa chỉ
                                                                email</Form.Label>
                                                            <Form.Control type='email' disabled value={user?.email}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="row">
                                                        <FormGroup className="col mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Tên công
                                                                ty</Form.Label>
                                                            <Form.Control type='text' disabled value={user?.companyName}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="row">
                                                        <FormGroup className="col-md-4 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Tỉnh / Thành
                                                                phố</Form.Label>
                                                            <Form.Select disabled className={"form-control"}>
                                                                <option>{user.address.province}</option>
                                                            </Form.Select>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-4 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Quận /
                                                                Huyện</Form.Label>
                                                            <Form.Select disabled className={"form-control"}>
                                                                <option>{user.address.district}</option>
                                                            </Form.Select>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-4 mb-3">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Phường /
                                                                xã</Form.Label>
                                                            <Form.Select disabled className={"form-control"}>
                                                                <option>{user.address.ward}</option>
                                                            </Form.Select>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="row">
                                                        <FormGroup className="col">
                                                            <Form.Label className={"font-weight-bold mb-1"}>Địa chi cụ
                                                                thể</Form.Label>
                                                            <Form.Control as={"textarea"} rows={8} disabled value={user.address.specific}/>
                                                        </FormGroup>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal onHide={handleCloseEditProfile} show={showEditProfileModal} size='lg' className='text-dark'>
                        <Modal.Header>
                            <Modal.Title className={'font-weight-semi-bold'}>Chỉnh sửa hồ sơ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <FormGroup className="col mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Họ và
                                        tên</Form.Label>
                                    <Form.Control type='text' className='border-dark' value={''} />
                                </FormGroup>
                            </div>

                            <div className="row">
                                <FormGroup className="col-md-6 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Ngày
                                        sinh</Form.Label>
                                    <input type='date' className="form-control border-dark"/>
                                </FormGroup>
                                <FormGroup className="col-md-6 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Giới
                                        tính</Form.Label>
                                    <Form.Select value={'Nguyen'} className="form-control border-dark">
                                        <option>Nam</option>
                                    </Form.Select>
                                </FormGroup>
                            </div>

                            <div className="row">
                                <FormGroup className="col-md-6 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Số điện
                                        thoại</Form.Label>
                                    <Form.Control type='text' value={''} className="border-dark"/>
                                </FormGroup>
                                <FormGroup className="col-md-6 mb-3">
                                    <Form.Label className="font-weight-bold mb-1 border-dark">Địa chỉ
                                        email</Form.Label>
                                    <Form.Control type='email' className="border-dark"/>
                                </FormGroup>
                            </div>

                            <div className="row">
                                <FormGroup className="col mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Tên công
                                        ty</Form.Label>
                                    <Form.Control type='text' value={''} className="border-dark"/>
                                </FormGroup>
                            </div>

                            <div className="row">
                                <FormGroup className="col-md-4 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Tỉnh / Thành
                                        phố</Form.Label>
                                    <Form.Select className="form-control border-dark" value={''}>
                                        <option>Nam</option>
                                    </Form.Select>
                                </FormGroup>
                                <FormGroup className="col-md-4 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Quận /
                                        Huyện</Form.Label>
                                    <Form.Select className="form-control border-dark" value={''}>
                                        <option>Nam</option>
                                    </Form.Select>
                                </FormGroup>
                                <FormGroup className="col-md-4 mb-3">
                                    <Form.Label className={"font-weight-bold mb-1"}>Phường /
                                        xã</Form.Label>
                                    <Form.Select className="form-control border-dark" value={''}>
                                        <option>Nam</option>
                                    </Form.Select>
                                </FormGroup>
                            </div>

                            <div className="row">
                                <FormGroup className="col">
                                    <Form.Label className="font-weight-bold mb-1 border-dark">Địa chi cụ
                                        thể</Form.Label>
                                    <Form.Control as={"textarea"} className='border-dark' rows={8} value={''}/>
                                </FormGroup>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditProfile}>
                                Hủy chỉnh sửa
                            </Button>
                            <Button variant="primary" onClick={handleCloseEditProfile}>
                                Lưu hồ sơ
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )
}

export default AccountContainer;