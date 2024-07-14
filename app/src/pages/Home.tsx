import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck,faTruckFast,faRightLeft,faPhoneVolume} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                            <FontAwesomeIcon icon={faCheck} className="text-primary m-0 mr-3"
                                             style={{fontSize: '3rem'}}/>
                            <h5 className="font-weight-semi-bold m-0" style={{fontSize: '1.5rem'}}>Sản phẩm chất
                                lượng</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                            <FontAwesomeIcon icon={faTruckFast} className="text-primary m-0 mr-2"
                                             style={{fontSize: '3rem'}}/>
                            <h5 className="font-weight-semi-bold m-0" style={{fontSize: '1.5rem'}}>Miễn phí vận
                                chuyển</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                            <FontAwesomeIcon icon={faRightLeft} className="text-primary m-0 mr-3"
                                             style={{fontSize: '3rem'}}/>
                            <h5 className="font-weight-semi-bold m-0" style={{fontSize: '1.5rem'}}>14 ngày hoàn trả</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                            <FontAwesomeIcon icon={faPhoneVolume} className="text-primary m-0 mr-3"
                                             style={{fontSize: '3rem'}}/>
                            <h5 className="font-weight-semi-bold m-0" style={{fontSize: '1.5rem'}}>Hỗ trợ 24/7</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Sản phẩm đang giảm giá</span></h2>
                </div>
                <div className="row px-xl-5 pb-3">

                </div>
            </div>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Sản phẩm bán chạy</span></h2>
                </div>
                <div className="row px-xl-5 pb-3">

                </div>
            </div>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Sản phẩm mới</span></h2>
                </div>
                <div className="row px-xl-5 pb-3">

                </div>
            </div>
        </>
    )
}
export default Home;