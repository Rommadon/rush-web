export const getIdGA = (googleAnalytics: string) => {
  if (googleAnalytics === undefined || googleAnalytics === null) {
    return '';
  }

  const splitCodeWithId = googleAnalytics.split("id=")[1];


  if (splitCodeWithId) {
    return splitCodeWithId.split('"')[0];
  }

  return '';
}

export const getFuntionGoogleTagManager = (googleTagManager: string) => {
  if (googleTagManager === undefined || googleTagManager === null) {
    return null;
  }

  const splitCodeWithScript = googleTagManager.split("<script>")[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return null;
}

export const getNonScriptGoogleTagManager = (googleTagManager: string) => {
  if (googleTagManager === undefined || googleTagManager === null) {
    return null;
  }

  const splitCodeWithScript = googleTagManager.split("<noscript>")[0];

  if (splitCodeWithScript) {
    const splitWithSrc = splitCodeWithScript.split('src="')[1];

    if (splitWithSrc) {
      return splitWithSrc.split('"')[0];
    }
  }

  return '';
}


export const getFuntionLingTag = (lineTag: string) => {
  if (lineTag === undefined || lineTag === null) {
    return '';
  }

  const splitCodeWithScript = lineTag.split("<script>")[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return '';
}

export const getNonScriptLingTag = (lineTag: string) => {
  if (lineTag === undefined || lineTag === null) {
    return '';
  }

  const splitCodeWithScript = lineTag.split("<noscript>")[1];

  if (splitCodeWithScript) {
    const splitWithSrc = splitCodeWithScript.split('src="')[1];

    if (splitWithSrc) {
      return splitWithSrc.split('"')[0];
    }
  }

  return '';
}

export const getFuntionFacebookPixel = (facebookPixel: string) => {
  if (facebookPixel === undefined || facebookPixel === null) {
    return '';
  }

  const splitCodeWithScript = facebookPixel.split("<script>")[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return '';
}

export const getNonScriptFacebookPixel = (facebookPixel: string) => {
  if (facebookPixel === undefined || facebookPixel === null) {
    return '';
  }

  const splitCodeWithScript = facebookPixel.split("<noscript>")[1];

  if (splitCodeWithScript) {
    const splitWithSrc = splitCodeWithScript.split('src="')[1];

    if (splitWithSrc) {
      return splitWithSrc.split('"')[0];
    }
  }

  return '';
}

export const getFuntionTiktokPixel = (tiktokPixel: string) => {
  if (tiktokPixel === undefined || tiktokPixel === null) {
    return '';
  }

  const splitCodeWithScript = tiktokPixel.split("<script>")[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return '';
}

export const getFirstFunctionFacebookMessengerCode = (facebookMessengerCode: string) => {
  if (facebookMessengerCode === undefined || facebookMessengerCode === null) {
    return '';
  }

  const splitCodeWithScript = facebookMessengerCode.split("<script>")[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return '';
}

export const getSecondFunctionFacebookMessengerCode = (facebookMessengerCode: string) => {
  if (facebookMessengerCode === undefined || facebookMessengerCode === null) {
    return '';
  }

  const splitCodeWithScript = facebookMessengerCode.split("<script>")[2];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('</script>')[0];
  }

  return '';
}

export const getScrDbd = (dbd: string) => {
  if (dbd === undefined || dbd === null) {
    return null;
  }

  const splitCodeWithScript = dbd.split(`src="`)[1];


  if (splitCodeWithScript) {
    return splitCodeWithScript.split('"')[0];
  }

  return null;
}
