# Captain Gemma

**Event:** HT6 Hack Day (Hacktoberfest x Hack the 6ix), Toronto, October 18, 2026
**Team:** Abhiram Vadali, Shubh, Dhyanesh
**Result:** 1st place

## Summary

Captain Gemma is an AI pilot that flies a Cessna 172 in a physics simulator. A physical model plane on a three-motor mount copies the simulated attitude in real time. Judges can see the AI's decisions on the simulator and the plane at the same time.

Everything runs locally on a laptop and an Arduino Uno. When Gemma runs locally through Ollama, no cloud service is involved.

## How it works

The system has four layers:

- **Simulator:** JSBSim flies a Cessna 172 (c172x model) at 50 Hz. It models lift, drag, stall, and gusts.
- **Captain:** Gemma 3 4B sets altitude, heading, and speed targets every 4 seconds, and immediately after a disturbance.
- **Bridge:** Python converts the simulated attitude into pitch, roll, and yaw commands and sends them to the Arduino over serial.
- **Mount:** the Arduino drives three motors, clamped to ±20° on each axis.

## The physical mount

The motors are stacked so that each one turns everything above it:

- **Yaw:** a 28BYJ-48 stepper on the base turns the whole stack like a turntable.
- **Pitch:** a servo on a cardboard plate tips the nose up and down.
- **Roll:** a servo on the pitch arm banks the wings left and right.

The plane is a 28 cm popsicle-stick model under 60 g, balanced at its mount point. A 3 lb dumbbell anchors the base.

## Learning

Gemma's weights do not change during a run. After each attempt, the captain writes a short note on what went wrong. On the next attempt it reads its last three notes and changes its behaviour. The attempt log records each run, so the improvement can be traced.

## Technical notes

- Serial protocol: 9600 baud, three commands (`Y`, `P`, `R`), each in whole degrees from −20 to +20.
- Pitch is measured against level under load, since the servo sags with the plane mounted.
- Yaw is limited to ±20° so the wires never wind up.
- Motors move one at a time to keep the 5 V supply stable.

## Stack

- **Simulator:** JSBSim (Python bindings)
- **AI:** Gemma 3 4B via Ollama
- **Hardware:** Arduino Uno, AccelStepper, Servo library
- **Laptop:** Windows, Ryzen 5 5500U, 16 GB RAM
- **Fabrication:** 3D-printed yaw hub, popsicle-stick airframe, cardboard plate

## Status

Hardware and the manual control interface are complete and tested. The simulator and captain were built and demonstrated at the event. Backup video and the attempt log are available.
