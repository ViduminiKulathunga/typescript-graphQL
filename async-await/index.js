function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayGreeting(name) {
  await delayFn(3000);
  console.log(name);
}

delayGreeting("Vidumini Kulathunga");

function division(num1, num2) {
  try {
    if (num2 === 0) throw new Error("Cannot divide by 0");
    return num1 / num2;
  } catch (error) {
    console.error("Error ", error);
    return null;
  }
}

async function mainFn() {
  console.log(await division(10, 2));
  console.log(await division(10, 0));
}

mainFn();
