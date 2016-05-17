import java.awt.Color;

import ihs.apcs.spacebattle.*;
import ihs.apcs.spacebattle.commands.*;

/**
 * Example 'Dummy' Ship for Basic Connection with no Game.
 * 
 * @author Michael A. Hawker
 *
 */
public class RotatorShip extends BasicSpaceship {

	public static void main(String[] args) {
		// ihs.apcs.spacebattle.TextClient.main(new String[] {"10.40.30.54", "RotatorShip"});
		TextClient.run("10.40.30.54", new RotatorShip());
	}
	
	/* (non-Javadoc)
	 * @see ihs.apcs.spacebattle.Spaceship#registerShip(int, int, int)
	 */
	@Override
	public RegistrationData registerShip(int numImages, int worldWidth,
			int worldHeight) {
		return new RegistrationData("Rotator Ship", Color.WHITE, 0);
	}

	/* (non-Javadoc)
	 * @see ihs.apcs.spacebattle.Spaceship#getNextCommand(ihs.apcs.spacebattle.Environment)
	 */
	@Override
	public ShipCommand getNextCommand(BasicEnvironment env) {
		String s = null;
		System.out.println(s.toString());
		return new RotateCommand(6);
	}

	/* (non-Javadoc)
	 * @see ihs.apcs.spacebattle.Spaceship#shipDestroyed()
	 */
	@Override
	public void shipDestroyed(String lastDestroyedBy) {
		// TODO Auto-generated method stub

	}

}
