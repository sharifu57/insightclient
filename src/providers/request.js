const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const get = (endpoint) => {
    return request({
        method: 'GET',
        endpoint
    })
}


export const post = async (endpoint, data) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error('Error posting data: ' + error.message);
    }
};
  

export const remove = (endpoint) => {
    return request({
        method: 'DELETE',
        endpoint
    })
}

export const request = ({ method = "GET", endpoint = "", data }) => {
    const requestOptions = {
        method,
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// Authorization: "Bearer " + localStorage.getItem("authUser").token,
		},
    };

    if (data){
        requestOptions.body = JSON.stringify(data);
    }

    return fetch(BASE_URL + endpoint, requestOptions).then((res) =>
		res.json()
	);
}