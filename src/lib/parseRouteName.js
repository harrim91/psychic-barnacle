const parseRouteName = name => name.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');
