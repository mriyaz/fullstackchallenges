import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification.content}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps, null)(Notification);
export default ConnectedNotification;
