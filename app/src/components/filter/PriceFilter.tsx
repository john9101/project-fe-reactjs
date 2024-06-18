import {formatCurrency} from "../../util/formatCurrency";

const PriceFilter = () => {
    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo khoảng giá</h5>
            <form>
                <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" checked id="price-all"/>
                    <label className="custom-control-label" htmlFor="price-all">Tất cả</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
                <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                    <label className="custom-control-label" htmlFor="price-1">Nhỏ hơn {formatCurrency(100000)}</label>
                    <span className="badge border font-weight-normal">150</span>
                </div>
                <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                    <label className="custom-control-label"
                           htmlFor="price-2">Từ {formatCurrency(100000)} - {formatCurrency(200000)}</label>
                    <span className="badge border font-weight-normal">295</span>
                </div>
                <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                    <label className="custom-control-label"
                           htmlFor="price-3">Từ {formatCurrency(200000)} - {formatCurrency(350000)}</label>
                    <span className="badge border font-weight-normal">246</span>
                </div>
                <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-4"/>
                    <label className="custom-control-label"
                           htmlFor="price-4">Từ {formatCurrency(350000)} - {formatCurrency(500000)}</label>
                    <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-5"/>
                    <label className="custom-control-label"
                           htmlFor="price-5">Từ {formatCurrency(500000)} - {formatCurrency(700000)}</label>
                    <span className="badge border font-weight-normal">168</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-6"/>
                    <label className="custom-control-label"
                           htmlFor="price-6">Từ {formatCurrency(500000)} - {formatCurrency(700000)}</label>
                    <span className="badge border font-weight-normal">168</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input type="checkbox" className="custom-control-input" id="price-7"/>
                    <label className="custom-control-label"
                           htmlFor="price-7">Lớn hơn {formatCurrency(700000)}</label>
                    <span className="badge border font-weight-normal">168</span>
                </div>
            </form>
        </div>
    )
}

export default PriceFilter