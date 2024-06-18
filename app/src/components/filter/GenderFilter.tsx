const GenderFilter = () => {
    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo giới tính</h5>
            <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" checked id="uniform-all"/>
                    <label className="custom-control-label" htmlFor="uniform-all">Tất cả</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="uniform-unisex"/>
                    <label className="custom-control-label" htmlFor="uniform-unisex">Đồng phục cho cả nam và nữ</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="uniform-male"/>
                    <label className="custom-control-label" htmlFor="uniform-male">Đồng phục cho nam</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="uniform-female"/>
                    <label className="custom-control-label" htmlFor="uniform-female">Đồng phục cho nữ</label>
                    <span className="badge border font-weight-normal">1000</span>
                </div>
            </form>
        </div>
    )
}

export default GenderFilter;