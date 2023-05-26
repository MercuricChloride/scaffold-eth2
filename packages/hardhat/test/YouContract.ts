import { YourContract } from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  const inXHours = (x: number) => Date.now() + 60 * 60 * x;
  const deadline = inXHours(7);
  const valueStake = ethers.utils.parseEther("0.1");

  let yourContract: YourContract;

  before(async () => {
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy()) as YourContract;
    await yourContract.deployed();

    const [user] = await ethers.getSigners();
    await yourContract.setAlarm(deadline, valueStake, user.address, { value: valueStake });
  });

  describe("Creating Alarms", function () {
    it("Shouldn't allow users to set an alarm if they already have one open", async function () {
      const [user] = await ethers.getSigners();
      await expect(
        yourContract.setAlarm(deadline, valueStake, user.address, { value: valueStake }),
      ).to.be.revertedWithCustomError(yourContract, "AlarmAlreadySet");
    });
  });
});
