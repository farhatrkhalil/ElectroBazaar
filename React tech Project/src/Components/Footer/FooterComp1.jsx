/* eslint-disable react/prop-types */
import './Footer.css';

function FooterComp1(props) {
  return (
    <div>
      <div className='Footer-section'>
        <p className="Footer-head">{props.head}</p>
        <div>
          {props.footerNav.map((item, index) => (
            <a href={item.link} key={index}>
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterComp1;
