import { useState, useEffect } from 'react';
import { FlapSegment, FlapRow } from '../App';

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

// function to return a card with the project, helps me add more later
// takes name, description, year, and dev-stack 

function ProjectCard({ name, desc, year, stack, isOnline }) {
  return ();
}

// array that contains projects, I can just use a for-each loop to iter through and put them in
const PROJECTS = [
  
];

export default function Projects({ onBack }) {
  return (
    <>
      <style>{`
        html, body {
          margin: 1;
          padding: 0;
          background: #0a0a0c;
          font-family: "Courier New", Courier, monospace;
          overflow-x: hidden;
        }
        
        .flap-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 8rem;
          height: 3.5rem;
          background: linear-gradient(to bottom, #151518 49%, #000000 51%);
          color: #f0f0f0;
          font-size: 1.8rem;
          font-weight: bold;
          border-radius: 8px;
          border: 1px solid #25252a;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5);
          position: relative;
        }

        .flap-cell::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.7);
        }

        .nav-flap {
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .nav-flap:hover {
          border-color: #d19a66 !important;
          transform: translateY(-2px);
        }
      `}</style>

        

      <div style={{
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "24px"
      }}>
        
        <div style={{
          background: "#111115",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.1)",
          border: "4px solid #1a1a22",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",            
          minHeight: "calc(100vh - 48px)", 
          boxSizing: "border-box"
        }}>
          <button 
            onClick={onBack}
            style={{
              marginTop: "20px",
              background: "#25252a",
              color: "#a0a0aa",
              border: "2px solid #35353a",
              padding: "6px 16px",                  
              cursor: "pointer",
              fontFamily: '"Courier New", Courier, monospace',
              fontWeight: "bold",
              fontSize: 20,                         
              width: "fit-content",                 
              alignSelf: "flex-start",
              borderRadius: "8px"                   
            }}
          > BACK
          </button>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            color: "#55555c", 
            fontSize: "0.75rem", 
            fontWeight: "bold",
            letterSpacing: "4px",
            padding: "0 10px"
          }}>
          </div>
          
          {/* Start elements here for projects*/} 

          <div style={{ display: "flex", flexDirection: "column", gap: "16px"}}>
            <FlapRow text="My Projects" length={11} />
          </div>
          

        </div>
      </div>
    </>
  );
}