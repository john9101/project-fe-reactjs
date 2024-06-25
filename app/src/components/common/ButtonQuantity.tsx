// components/common/ButtonQuantity.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface ButtonQuantityProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
}

const ButtonQuantity: React.FC<ButtonQuantityProps> = ({ quantity, setQuantity }) => {
    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    }

    return (
        <div className="input-group quantity mr-3" style={{ width: "130px" }}>
            <div className="input-group-btn">
                <button className="btn btn-primary btn-minus" onClick={handleMinusClick}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </div>
                <input
                    type="number"
                    className="form-control bg-secondary text-center"
                    value={quantity}
                    onBlur={event => {
                        if (event.target.value === "" || Number.parseInt(event.target.value) <= 0) {
                            setQuantity(1);
                        }
                    }}
                    onChange={event => {
                        setQuantity(Number.parseInt(event.target.value));
                    }}
                />
            <div className="input-group-btn">
                <button className="btn btn-primary btn-plus" onClick={handlePlusClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default ButtonQuantity;
