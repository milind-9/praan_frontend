const generateMockData = (length) => {
    // Generate an array of random data for mock purposes
    const mockData = [];
    for (let i = 0; i < length; i++) {
      mockData.push({
        t: i,
        p1: Math.random() * 100,
        p25: Math.random() * 150,
        p10: Math.random() * 120,
        w: Math.random() * 30,
        h: Math.random() * 360,
      });
    }
    return mockData;
  };
  
  export default generateMockData;
  