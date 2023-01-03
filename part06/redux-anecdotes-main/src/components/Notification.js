import { connect } from 'react-redux';
const Notification = (props) => {
  const notification = props.notifications.message;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};
const ConnectedNotifications = connect(mapStateToProps, null)(Notification);
export default ConnectedNotifications;
