import React, { useState, useEffect } from 'react';
import { Users, Building, Map, DollarSign, Calendar, Clock } from 'lucide-react';
import './PropertyDashboard.css';

function PropertyDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Platform Prperty Dashboard</h1>
        <p className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-green">
          <div className="stat-icon-container">
            <div className="stat-icon stat-icon-green">
              <Users size={24} className="icon-color-green" />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Active Vehicle</h3>
            <p className="stat-value">12k</p>
          </div>
        </div>

        <div className="stat-card stat-card-red">
          <div className="stat-icon-container">
            <div className="stat-icon stat-icon-red">
              <Building size={24} className="icon-color-red" />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Active Hotels</h3>
            <p className="stat-value">150</p>
          </div>
        </div>

        <div className="stat-card stat-card-blue">
          <div className="stat-icon-container">
            <div className="stat-icon stat-icon-blue">
              <Map size={24} className="icon-color-blue" />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Daily Income</h3>
            <p className="stat-value">$345</p>
          </div>
        </div>

        <div className="stat-card stat-card-purple">
          <div className="stat-icon-container">
            <div className="stat-icon stat-icon-purple">
              <DollarSign size={24} className="icon-color-purple" />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total InCome</h3>
            <p className="stat-value">$650k</p>
          </div>
        </div>
      </div>


  
    </div>
  );
};

export default PropertyDashboard;