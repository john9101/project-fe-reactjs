import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck,faTruckFast,faRightLeft,faPhoneVolume} from "@fortawesome/free-solid-svg-icons"
import FeatureProductsSection from "../components/common/FeatureProductsSection";
import {FeatureProductsDecorateConstant} from "../constants/featureProductsDecorate.constant";

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
            {Object.keys(FeatureProductsDecorateConstant).map((decorateKey, index)=> (
                <FeatureProductsSection key={index} decorateKey={decorateKey}/>
            ))}
        </>
    )
}
export default Home;