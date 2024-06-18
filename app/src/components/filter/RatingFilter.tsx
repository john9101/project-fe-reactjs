import {Rating} from "@mui/material";

const RatingFilter = () => {
    return (
        <div className="mb-5">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo đánh giá</h5>
            <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" checked id="rating-all"/>
                    <label className="custom-control-label" htmlFor="rating-all">Tất cả</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="rating-4.5_up"/>
                    <label className="custom-control-label d-inline-flex align-items-center" htmlFor="rating-4.5_up"><Rating className={'pr-1'} value={4.5} precision={0.5} readOnly/> Từ 4.5 sao
                        trở lên</label>
                    <span className="badge border font-weight-normal">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="rating-4_up"/>
                    <label className="custom-control-label d-inline-flex align-items-center" htmlFor="rating-4_up"><Rating className={'pr-1'} value={4} readOnly/> Từ 4 sao trở lên</label>
                    <span className="badge border font-weight-normal">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="rating-3_up"/>
                    <label className="custom-control-label d-inline-flex align-items-center" htmlFor="rating-3_up"><Rating className={'pr-1'} value={3} readOnly/> Từ 3 sao trở lên</label>
                    <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="rating-2_up"/>
                    <label className="custom-control-label d-inline-flex align-items-center" htmlFor="rating-2_up"><Rating className={'pr-1'} value={2} readOnly/> Từ 2 sao trở lên</label>
                    <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="rating-1_up"/>
                    <label className="custom-control-label d-inline-flex align-items-center" htmlFor="rating-1_up"><Rating className={'pr-1'} value={1} readOnly/> Từ 1 sao trở lên</label>
                    <span className="badge border font-weight-normal">168</span>
                </div>
            </form>
        </div>
    )
}

export default RatingFilter;