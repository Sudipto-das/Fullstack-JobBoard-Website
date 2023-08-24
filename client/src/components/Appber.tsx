import { Typography, Button, Avatar } from "@mui/material";

const Appber = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        marginBottom: "1em",
        zIndex: 1,
        background:'white',
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Typography
          variant={"h6"}
          style={{ fontWeight: "bolder", fontFamily: "initial",color:'#27AE60 ' }}
        >
          CareearConnect
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button style={{color:'#58D68D'}}>Applications</Button>
        </div>

        <div style={{ marginRight: 10 }}>
          <Button style={{color:'#58D68D'}}>Jobs</Button>
        </div>
     
      </div>
      <div style={{display:'flex' ,marginRight:10}}>
        <Button style={{ background: "black" ,marginRight:10,color:'#58D68D'}} variant={"contained"}>
          Logout
        </Button>
        <Avatar></Avatar>
      </div>
    </div>
  );
};
export default Appber;
