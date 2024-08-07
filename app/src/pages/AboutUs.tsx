import React from 'react'
import image from '../assets/img/caroselAbout.jpg'
import '../assets/css/style.module.scss'
import '../assets/css/styleAbout.scss'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import imageContent1 from '../assets/img/imageContentAbout1.jpg'
import imageContent2 from '../assets/img/imageContentAbout2.jpg'
import imageContent3 from '../assets/img/imageContentAbout3.jpeg'
import imageContent4 from '../assets/img/imageContentAbout4.jpg'

const AboutUs = () => {
    return (
        <div className='aboutPage'>
            <div className='imageContent'><img src={image} alt="404" /></div>
            <div className="feedbackArea">
                <Card className="Card">
                    <CardActionArea className="CardArea">
                        <CardMedia className='MediaConent'
                            component="img"
                            height="600"
                            src={imageContent1}
                            alt="green iguana"
                        />
                        <CardContent className='CardContent'>
                            <Typography gutterBottom variant="h4" component="div" className='content TitleContent'>
                                Công ty Bán Đồng Phục Uniform YOUNG'S STYLE Bán Đồng Phục chất lượng, uy tín
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Lựa chọn mẫu đồng phục phù hợp với doanh nghiệp là một quyết định không dễ đối với doanh nghiệp chưa từng Bán Đồng Phục. Đồng Phục Uniform YOUNG'S STYLE là Nhà cung cấp và sản xuất trực tiếp đa dạng đồng phục rất hân hạnh được tư vấn đến Quý doanh nghiệp những lời khuyên tốt nhất cho bộ đồng phục của mình, nhằm giảm được chi phí mua Đồng Phục, mà lại hài lòng về sản phẩm.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Hiện nay đồng phục áo thun đang là trang phục phổ biến, với sự trẻ trung, năng động và thoải mái, phù hợp với mọi lứa tuổi, mọi đối tượng. Kèm theo đó xu hướng thiết kế đồng phục áo thun ngày càng đa dạng về mẫu mã, nhiều style mới ra đời tạo sự lôi cuốn, hấp dẫn.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Bên cạnh đó, đồng phục văn phòng lại tạo nên đẳng cấp sang trọng nơi làm việc, tôn nên vẻ đẹp tinh tế cho người mặc. Đồng phục văn phòng cũng có nhiều mẫu mã lịch lãm, cao cấp và trẻ trung.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Ngoài ra, đồng phục bảo hộ là trang phục cần thiết để bảo vệ an toàn cho người lao động. Đồng phục bảo hộ lao động có gắn phản quang hoặc chất liệu vải màu chói để dễ dàng phát hiện khi xảy ra sự cố, giúp người lào động luôn cảm thấy an tâm nơi công trường.
                                    </Typography>
                                </li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="Card">
                    <CardActionArea className="CardArea">
                        <CardMedia className='MediaConent'
                            component="img"
                            height="510"
                            src={imageContent2}
                            alt="green iguana"
                        />
                        <CardContent className='CardContent'>
                            <Typography gutterBottom variant="h4" component="div" className='content TitleContent'>
                                Địa chỉ Bán Đồng Phục, in đồng phục uy tín, chất lượng tại TP.Hồ Chí Minh
                            </Typography>
                            <ul className="listContent">
                                <li><Typography gutterBottom variant="h6" component="div" className='content feedbackContent'>
                                    Công Ty TNHH Đồng Phục Uniform YOUNG'S STYLE với kinh nghiệm trong ngành đồng phục trên 10 năm, đã dần khẳng định mình là đơn vị chuyên sản xuất trực tiếp các loại đồng phục đa dạng mẫu mã như: đồng phục áo thun, đồng phục công ty, áo bảo hộ lao động, đồng phục áo lớp, đồng phục công sở, đồng phục văn phòng, đồng phục teambuilding…
                                </Typography></li>
                                <li><Typography gutterBottom variant="h6" component="div" className='content feedbackContent'>
                                    Đồng Phục Uniform YOUNG'S STYLE cam kết sản phẩm đồng phục làm ra đạt chất lượng cao và giá cả phải chăng và đã đem đến sự tín nhiệm của khách hàng trên toàn quốc.
                                </Typography></li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="Card">
                    <CardActionArea className="CardArea">
                        <CardMedia className='MediaConent'
                            component="img"
                            height="500"
                            src={imageContent3}
                            alt="green iguana"
                        />
                        <CardContent className='CardContent'>
                            <Typography gutterBottom variant="h4" component="div" className='content TitleContent'>
                                Lợi ích khi mua Đồng Phục tại Uniform YOUNG'S STYLE
                            </Typography>
                            <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                Đến với Đồng Phục Uniform YOUNG'S STYLE, bạn sẽ nhận được:
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Giá thành sản xuất đồng phục thấp nhất vì được may tại xưởng, không qua trung gian. Sản xuất phải gần khu nguyên liệu để tiết kiệm chi phí. Bán hàng phải ở gần người mua để giao nhanh
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Chúng tôi chuyên sản xuất đồng phục gấp cho khách hàng trong thời gian sớm nhất
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Mỗi đồng phục may xong đều qua khâu kiểm tra thành phẩm rất kỹ lưỡng
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Thiết kế miễn phí các mẫu đồng phục trước khi đặt cọc thanh toán
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Đối với đơn hàng đồng phục từ 100 cái trở lên, Uniform YOUNG'S STYLE hỗ trợ may miễn phí áo đồng phục mẫu
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Đồng phục sẽ được giao miễn phí tới tận tay khách hàng trong nội ô TpHCM
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Máy may được trang bị mới nhất, tốt nhất để tạo ra những chiếc áo đồng phục chất lượng nhất
                                    </Typography>
                                </li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="Card FooterCard">
                    <CardActionArea className="CardArea FooterCardArea">
                        <CardMedia className='MediaConent'
                            component="img"
                            height="600"
                            src={imageContent4}
                            alt="green iguana"
                        />
                        <CardContent className='CardContent'>
                            <Typography gutterBottom variant="h4" component="div" className='content TitleContent'>
                                Cam kết sản xuất đồng phục chất lượng
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Tiền thân là 1 xưởng may gia đình hoạt động trong lĩnh vực may mặc và thiết kế đồng phục, Đồng Phục Uniform YOUNG'S STYLE với nhiều năm kinh nghiệm trong việc tư vấn, thiết kế, đã cho ra đời những bộ đồng phục hoàn hảo từ mẫu mã đến chất liệu. Được biết đến là một địa chỉ Bán Đồng Phục uy tín, giá rẻ, Đồng phục Uniform YOUNG'S STYLE đã cung cấp đa dạng các mặt hàng đồng phục cho mọi ngành nghề trên toàn quốc như: đồng phục áo thun, đồng phục bảo hộ lao động cho công nhân, đồng phục tạp dề, đồng phục văn phòng, đồng phục nhà hàng, đồng phục khách sạn, mũ nón đồng phục, túi vải tote bag….
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Với hệ thống nhà xưởng, các trang thiết bị máy móc hiện đại, tiên tiến nhất được nhập khẩu trực tiếp từ nước ngoài và cùng một đội thiết kế sáng tạo, các công nhân may tay nghề cao, chuyên nghiệp, Đồng phục Uniform YOUNG'S STYLE sẽ mang lại cho khách hàng những sản phẩm đồng phục chất lượng nhất.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content feedbackContent'>
                                        Mọi thông tin chi tiết vui lòng liên hệ với Bán Đồng Phục Uniform YOUNG'S STYLE để được tư vấn
                                    </Typography>
                                </li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}
export default AboutUs;