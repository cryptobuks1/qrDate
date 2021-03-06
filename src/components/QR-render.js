import React, { useState, useEffect, useContext } from "react";
import QRCode from "qrcode.react";
import { Text, Box } from "grommet";
import styled from "styled-components";
import ScanOrShow from "../scenes/ScanOrShow";
import compareTwoResponses from "../utils/compareTwoReponses";
import SocketContext from "./SocketContext";
import ShowResults from "../scenes/ShowResults";

const StyledQR = styled(QRCode)`
  /* position: fixed; */
  /* left: 50%; */
  /* bottom: 1rem; */
  /* transform: translate(-50%, -10%); */
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const QrRender = ({ qAndAs, user }) => {
  const [result, setScanResult] = useState();
  const [comparedResult, compare] = useState();
  const [socketResponse, setSocketResponse] = useState();
  const [readerShowing, showReader] = useState(false);
  const socket = useContext(SocketContext);
  const myResults = [...qAndAs];
  const fullObject = JSON.stringify({
    firstName: user.firstName,
    userId: user.id,
    qAndAs
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("STORE_USER_ID", {
        socketId: socket.io.engine.id,
        userId: user.id
      });
    });
    socket.on("SCANNED_YOU", data => {
      setSocketResponse(data);
    });
  }, [socketResponse, user.id, socket]);

  const resetCompare = () => {
    setScanResult(null);
    compare(null);
    setSocketResponse(null);
  };

  if (comparedResult) {
    return (
      <ShowResults
        result={result}
        fromUserId={user.id}
        resetCompare={resetCompare}
      />
    );
  }

  if (socketResponse) {
    return (
      <ShowResults
        socketResponse={socketResponse}
        resetCompare={resetCompare}
      />
    );
  }

  if (result) {
    socket.emit("COMPARE", {
      scanningUserId: user.id,
      scannedUserId: result.userId,
      surveyId: process.env.REACT_APP_SURVEY_ID || 1
    });
    compare(compareTwoResponses(myResults, result));
  }

  return (
    <Box>
      <Text alignSelf="center" size="xlarge" color="#B300B3">
        Lookin good,{" "}
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
      </Text>
      {!readerShowing && (
        <StyledQR
          value={fullObject}
          size={256}
          renderAs="svg"
          fgColor="#7d4cdb"
        />
      )
      }
      <ScanOrShow result={result} setScanResult={setScanResult} readerShowing={readerShowing} showReader={showReader} />
    </Box>
  );
};

export default QrRender;
