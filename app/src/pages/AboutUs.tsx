import React from 'react'
import Topbar from '../components/common/Topbar';
import Footer from '../components/common/Footer';
import image from '../assets/img/caroselAbout.jpg'
import '../assets/css/styleAbout.scss'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import imageContent1 from '../assets/img/imageContentAbout.jpg'
import imageContent2 from '../assets/img/imageContentAbout1.jpg'
import imageContent3 from '../assets/img/imageContentAbout3.jpg'
import imageContent4 from '../assets/img/imageContentAbout4.jpg'

type Props = {}

const AboutUs = (props: Props) => {
    return (

        <div className='aboutPage'>
            <Topbar />
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
                            <Typography gutterBottom variant="h4" component="div" className='content'>
                                Công ty May Đồng Phục E-Shopper may đồng phục chất lượng, uy tín
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Lựa chọn mẫu đồng phục phù hợp với doanh nghiệp là một quyết định không dễ đối với doanh nghiệp chưa từng may đồng phục. Đồng Phục E-Shopper là Nhà cung cấp và sản xuất trực tiếp đa dạng đồng phục rất hân hạnh được tư vấn đến Quý doanh nghiệp những lời khuyên tốt nhất cho bộ đồng phục của mình, nhằm giảm được chi phí may đồng phục, mà lại hài lòng về sản phẩm.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Hiện nay đồng phục áo thun đang là trang phục phổ biến, với sự trẻ trung, năng động và thoải mái, phù hợp với mọi lứa tuổi, mọi đối tượng. Kèm theo đó xu hướng thiết kế đồng phục áo thun ngày càng đa dạng về mẫu mã, nhiều style mới ra đời tạo sự lôi cuốn, hấp dẫn.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Bên cạnh đó, đồng phục văn phòng lại tạo nên đẳng cấp sang trọng nơi làm việc, tôn nên vẻ đẹp tinh tế cho người mặc. Đồng phục văn phòng cũng có nhiều mẫu mã lịch lãm, cao cấp và trẻ trung.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
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
                            <Typography gutterBottom variant="h4" component="div" className='content'>
                                Địa chỉ may đồng phục, in đồng phục uy tín, chất lượng tại TP.Hồ Chí Minh
                            </Typography>
                            <ul className="listContent">
                                <li><Typography gutterBottom variant="h6" component="div" className='content'>
                                    Công Ty TNHH May Đồng Phục E-Shopper với kinh nghiệm trong ngành sản xuất đồng phục trên 10 năm, đã dần khẳng định mình là đơn vị chuyên sản xuất trực tiếp các loại đồng phục đa dạng mẫu mã như: đồng phục áo thun, đồng phục công ty, áo bảo hộ lao động, đồng phục áo lớp, đồng phục công sở, đồng phục văn phòng, đồng phục teambuilding…
                                </Typography></li>
                                <li><Typography gutterBottom variant="h6" component="div" className='content'>
                                    May Đồng Phục E-Shopper cam kết sản phẩm đồng phục làm ra đạt chất lượng cao và giá cả phải chăng và đã đem đến sự tín nhiệm của hơn 5.000 khách hàng trên toàn quốc.
                                </Typography></li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="Card">
                    <CardActionArea className="CardArea">
                        <CardMedia className='MediaConent'
                            component="img"
                            height="620"
                            src={imageContent3}
                            alt="green iguana"
                        />
                        <CardContent className='CardContent'>
                            <Typography gutterBottom variant="h4" component="div" className='content'>
                                Lợi ích khi may đồng phục tại E-Shopper
                            </Typography>
                            <Typography variant="h6" color="text.secondary" className='content'>
                                Đến với May Đồng Phục E-Shopper chúng tôi, bạn sẽ nhận được:
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Giá thành sản xuất đồng phục thấp nhất vì được may tại xưởng, không qua trung gian. Sản xuất phải gần khu nguyên liệu để tiết kiệm chi phí. Bán hàng phải ở gần người mua để giao nhanh
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Chúng tôi chuyên sản xuất đồng phục gấp cho khách hàng trong thời gian sớm nhất
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Mỗi đồng phục may xong đều qua khâu kiểm tra thành phẩm rất kỹ lưỡng
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Thiết kế miễn phí các mẫu đồng phục trước khi đặt cọc thanh toán
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Đối với đơn hàng đồng phục từ 100 cái trở lên, dongphuc.vn hỗ trợ may miễn phí áo đồng phục mẫu
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Đồng phục sẽ được giao miễn phí tới tận tay khách hàng trong nội ô TpHCM
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
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
                            <Typography gutterBottom variant="h4" component="div" className='content'>
                                Cam kết sản xuất đồng phục chất lượng
                            </Typography>
                            <ul className='listContent' >
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Tiền thân là 1 xưởng may gia đình hoạt động trong lĩnh vực may mặc và thiết kế đồng phục, xưởng may đồng phục E-Shopper với nhiều năm kinh nghiệm trong việc tư vấn, thiết kế, đã cho ra đời những bộ đồng phục hoàn hảo từ mẫu mã đến chất liệu. Được biết đến là một địa chỉ may đồng phục uy tín, giá rẻ, Đồng phục E-Shopper – dongphuc.vn đã cung cấp đa dạng các mặt hàng đồng phục cho mọi ngành nghề trên toàn quốc như: đồng phục áo thun, đồng phục bảo hộ lao động cho công nhân, đồng phục tạp dề, đồng phục văn phòng, đồng phục nhà hàng, đồng phục khách sạn, mũ nón đồng phục, túi vải tote bag….
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Với hệ thống nhà xưởng, các trang thiết bị máy móc hiện đại, tiên tiến nhất được nhập khẩu trực tiếp từ nước ngoài và cùng một đội thiết kế sáng tạo, các công nhân may tay nghề cao, chuyên nghiệp, Đồng phục E-Shopper sẽ mang lại cho khách hàng những sản phẩm đồng phục chất lượng nhất.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h6" color="text.secondary" className='content'>
                                        Mọi thông tin chi tiết vui lòng liên hệ với May Đồng Phục E-Shopper để được tư vấn
                                    </Typography>
                                </li>
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
export default AboutUs;