import textstyles from "../../../style/InfoText.module.css";

const Greetings = (props) => (
  <>
    <h1>Welcome {props.user}</h1>
    <span>
      here your transaction of&nbsp;
      <span>
        <span className={textstyles.display_text}>{props.wallet?.name}</span>{" "}
        wallet -&nbsp;
        <span
          className={textstyles.display_text}
          style={{ backgroundColor: "darkgray" }}
        >
          id:{props.choosenWallet}
        </span>
      </span>
      &nbsp;,&nbsp;
      <a href="/wallets">back</a>
    </span>
  </>
);
export default Greetings;
