import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { walletconnect, resetWalletConnector } from "./connectors";
import Ball from "./ball";
import "../styles/style.css";
import UserAvatar from "./UserAvatar";
import { CustomButton } from "../styles/style";
import { Box, Typography } from "@mui/material";

const MissionInfo = [
  { level: 1, total: 10, tolerance: 5, rate: 15 },
  { level: 2, total: 20, tolerance: 5, rate: 15 },
  { level: 3, total: 30, tolerance: 5, rate: 15 },
];

const Mission = () => {
  const { activate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState(null);
  const [account, setAccount] = useState(localStorage.getItem("BG_ACCOUNT"));
  const [level, setLevel] = useState(0);
  const [ballCnt, setBallCnt] = useState(MissionInfo[level].total);
  const [hitCnt, setHitCnt] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("Start Game");
  const [onProgress, setOnProgress] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const initMission = () => {
      const balls = document.querySelectorAll(".ball");
      let maxDur = 0;
      for (let i = 0; i < balls.length; i++) {
        const dur = animateBall(balls, i);
        if (dur > maxDur) maxDur = dur;
      }
      const timer = setTimeout(() => {
        setOnProgress(false);
        clearTimeout(timer);
      }, maxDur * 1000);
    };
    if (isReady) initMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (level === 0) {
      if (
        (onProgress && hitCnt === ballCnt) ||
        (!onProgress && hitCnt + MissionInfo[level].tolerance >= ballCnt)
      ) {
        setIsReady(false);
        setIsPassed(true);
        setMessage(`Mission Complete!\n Start Mission ${level + 2}`);
      } else if (isReady && !onProgress) {
        setIsReady(false);
        setIsPassed(false);
        setMessage(`Mission Failed!\n Restart Game`);
      }
    } else if (level === 1) {
      if (
        (onProgress && hitCnt === ballCnt) ||
        (!onProgress && hitCnt + MissionInfo[level].tolerance >= ballCnt)
      ) {
        setIsReady(false);
        setIsPassed(true);
        setMessage(`Mission Complete!\n Start Mission ${level + 2}`);
      } else if (isReady && !onProgress) {
        setIsReady(false);
        setIsPassed(false);
        setMessage(`Mission Failed!\n Restart Mission`);
      }
    } else if (level === 2) {
      if (
        (onProgress && hitCnt === ballCnt) ||
        (!onProgress && hitCnt + MissionInfo[level].tolerance >= ballCnt)
      ) {
        setIsReady(false);
        setIsPassed(true);
        setMessage("Congratulations! You win!\n Restart Game");
      } else if (isReady && !onProgress) {
        setIsReady(false);
        setIsPassed(false);
        setMessage(`Mission Failed!\n Restart Mission`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitCnt, ballCnt, onProgress]);

  const getRandomPosition = (element) => {
    const x = document.body.offsetHeight - element.clientHeight;
    const y = document.body.offsetWidth - element.clientWidth;
    const randomX = Math.floor(Math.random() * x);
    const randomY = Math.floor(Math.random() * y * 0.8);
    return [randomX, randomY];
  };

  const animateBall = (balls, i) => {
    const ball = balls[i];
    const xy = getRandomPosition(ball);
    const animationDuration = Math.floor(
      Math.random() * MissionInfo[level].rate + 7.5
    );
    Object.assign(ball.style, {
      top: xy[0] + "px",
      left: xy[1] + "px",
      zIndex: i,
      animationDuration: animationDuration + "s",
    });
    ball.classList.add("animating");
    return animationDuration;
  };

  const hitBall = (e) => {
    e.preventDefault();
    const ball = e.target;
    ball.classList.remove("animating");
    ball.classList.add("hit");
    setHitCnt(hitCnt + 1);
    window.setTimeout(function () {
      ball.style.display = "none";
    }, 50);
  };

  const connectWallet = async () => {
    resetWalletConnector(walletconnect);
    await activate(walletconnect);
    const retAddress = await walletconnect.getAccount();
    setActivatingConnector(walletconnect);
    setAccount(retAddress);
    localStorage.setItem("BG_ACCOUNT", retAddress);
  };

  const disconnectWallet = async () => {
    if (activatingConnector !== null) activatingConnector.deactivate();
    localStorage.removeItem("BG_ACCOUNT");
    setActivatingConnector(null);
    window.location.reload();
  };

  return (
    <div className="mission" id="mission">
      {/* <div className="message">{message}</div> */}
      <Box
        sx={{
          zIndex: "90",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          background: "#ea3b3b",
          padding: "10px",
          fontSize: "24px",
          color: "#fff",
          textShadow: "-2px 3px 0 #bb1616",
        }}
      >
        <Typography variant="h3">
          Score : {hitCnt} / {ballCnt}
        </Typography>
        <Typography variant="h3">Level : {level + 1}</Typography>
        {account && <UserAvatar handleDisconnect={disconnectWallet} />}
      </Box>
      {account ? (
        isReady ? (
          Array(ballCnt)
            .fill(0)
            .map((x, i) => <Ball key={i} hit={hitBall} />)
        ) : (
          <CustomButton
            onClick={() => {
              setBallCnt(
                isPassed
                  ? MissionInfo[(level + 1) % MissionInfo.length].total
                  : MissionInfo[level].total
              );
              setHitCnt(0);
              setLevel(isPassed ? (level + 1) % MissionInfo.length : level);
              setIsReady(true);
              setOnProgress(true);
            }}
          >
            {message}
          </CustomButton>
        )
      ) : (
        <CustomButton onClick={connectWallet}>Connect Wallet</CustomButton>
      )}
    </div>
  );
};

export default Mission;
