import { useState } from "react";

const CHANNELS = ["Canal 1", "Canal 2", "Canal 3", "Canal 4", "Canal 5"];
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;

export function RemoteControl() {
  const [isOn, setIsOn] = useState(false);
  const [channel, setChannel] = useState(0);
  const [volume, setVolume] = useState(50);

  function togglePower() {
    setIsOn((prev) => !prev);
  }

  function nextChannel() {
    setChannel((prev) => (prev + 1) % CHANNELS.length);
  }

  function prevChannel() {
    setChannel((prev) => (prev - 1 + CHANNELS.length) % CHANNELS.length);
  }

  function increaseVolume() {
    setVolume((prev) => Math.min(prev + 10, MAX_VOLUME));
  }

  function decreaseVolume() {
    setVolume((prev) => Math.max(prev - 10, MIN_VOLUME));
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.tv}>
        <div style={{ ...styles.screen, background: isOn ? "#111" : "#333" }}>
          {isOn ? (
            <>
              <p style={styles.channelName}>{CHANNELS[channel]}</p>
              <p style={styles.volumeText}>Volume: {volume}%</p>
            </>
          ) : (
            <p style={styles.offText}>TV Desligada</p>
          )}
        </div>
      </div>

      <div style={styles.remote}>
        <button style={{ ...styles.btn, ...styles.powerBtn }} onClick={togglePower}>
          {isOn ? "⏻ Desligar" : "⏻ Ligar"}
        </button>

        <p style={styles.label}>Canal</p>
        <div style={styles.row}>
          <button style={styles.btn} onClick={prevChannel} disabled={!isOn}>
            ▲
          </button>
          <span style={styles.channelDisplay}>{channel + 1}</span>
          <button style={styles.btn} onClick={nextChannel} disabled={!isOn}>
            ▼
          </button>
        </div>

        <p style={styles.label}>Volume</p>
        <div style={styles.row}>
          <button style={styles.btn} onClick={decreaseVolume} disabled={!isOn}>
            −
          </button>
          <span style={styles.channelDisplay}>{volume}</span>
          <button style={styles.btn} onClick={increaseVolume} disabled={!isOn}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    fontFamily: "sans-serif",
    padding: "32px",
  },
  tv: {
    width: "360px",
    background: "#222",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
  },
  screen: {
    height: "200px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s",
  },
  channelName: { color: "#fff", fontSize: "24px", margin: 0 },
  volumeText: { color: "#aaa", fontSize: "14px", margin: "8px 0 0" },
  offText: { color: "#555", fontSize: "18px" },
  remote: {
    background: "#1a1a2e",
    borderRadius: "16px",
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    width: "200px",
  },
  btn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    background: "#16213e",
    color: "#eee",
    transition: "opacity 0.2s",
  },
  powerBtn: {
    background: "#c0392b",
    color: "#fff",
    width: "100%",
    marginBottom: "8px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  label: {
    color: "#aaa",
    fontSize: "12px",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  channelDisplay: {
    color: "#fff",
    fontSize: "18px",
    minWidth: "32px",
    textAlign: "center",
  },
};
