function Copyright(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: "#000",
        padding: "20px 0",
        fontSize: "0.8rem",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <p style={{ opacity: "0.4" }}>
        <span>
          &copy; Copyright {props.name}-{props.year} <br /> All Rights Reserved
        </span>
      </p>
    </div>
  );
}

export default Copyright;
