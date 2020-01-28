
export const getMembersList = () => {
      return fetch('https://my.api.mockaroo.com/attendee_details.json?key=fd93d830')
            .then((response) => response.json())
            .then((responseJson) => {
                  return responseJson
            })
            .catch((error) => {
                  console.error(error);
            });
}