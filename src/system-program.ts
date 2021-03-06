import * as BufferLayout from '@solana/buffer-layout';

import {encodeData, decodeData, InstructionType} from './instruction';
import * as Layout from './layout';
import {NONCE_ACCOUNT_LENGTH} from './nonce-account';
import {PublicKey} from './publickey';
import {GRANT_DATA_PUBKEY, SYSVAR_CLOCK_PUBKEY, SYSVAR_FNODEDATA_PUBKEY, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, SYSVAR_RENT_PUBKEY} from './sysvar';
import {Transaction, TransactionInstruction} from './transaction';
import {toBuffer} from './util/to-buffer';
import {Buffer} from 'buffer';

/**
 * Create account system transaction params
 */
export type CreateAccountParams = {
  /** The account that will transfer lamports to the created account */
  fromPubkey: PublicKey;
  /** Public key of the created account */
  newAccountPubkey: PublicKey;
  /** Amount of lamports to transfer to the created account */
  lamports: number;
  /** Amount of space in bytes to allocate to the created account */
  space: number;
  /** Public key of the program to assign as the owner of the created account */
  programId: PublicKey;
};

/**
 * Transfer system transaction params
 */
export type TransferParams = {
  /** Account that will transfer lamports */
  fromPubkey: PublicKey;
  /** Account that will receive transferred lamports */
  toPubkey: PublicKey;
  /** Amount of lamports to transfer */
  lamports: number;
};

/**
 * CreateNode system transaction params
 */
export type CreateNodeParams = {
  /** Account that will burn lamports */
  fromPubkey: PublicKey;
  /** Reward Address of Node */
  reward_address: PublicKey;
  /** Node_Type of the node */
  node_type: number;
};

/**
 * AddGrant system transaction params
 */
export type AddGrantParams = {
  /** Account that will send TX */
  fromPubkey: PublicKey;
  /** GrantID */
  GrantID: number;
  /** Reward Address of Grant */
  ReceivingAddress: PublicKey;
  /** GrantAmount in lamports */
  GrantAmount: number;
};

/**
 * VoteOnGrant system transaction params
 */
export type VoteOnGrant = {
  /** Account that will send TX */
  fromPubkey: PublicKey;
  /** GrantHash */
  GrantHash: Buffer;
  /** Vote on Grant */
  Vote: boolean;
  /** NodeHash from which vote is to be casted */
  NodeHash: Buffer;
};

/**
 * DissolveGrant system transaction params
 */
export type DissolveGrant = {
  /** Account that will send TX */
  fromPubkey: PublicKey;
  /** GrantHash */
  GrantHash: Buffer;
};

/**
 * Assign system transaction params
 */
export type AssignParams = {
  /** Public key of the account which will be assigned a new owner */
  accountPubkey: PublicKey;
  /** Public key of the program to assign as the owner */
  programId: PublicKey;
};

/**
 * Create account with seed system transaction params
 */
export type CreateAccountWithSeedParams = {
  /** The account that will transfer lamports to the created account */
  fromPubkey: PublicKey;
  /** Public key of the created account. Must be pre-calculated with PublicKey.createWithSeed() */
  newAccountPubkey: PublicKey;
  /** Base public key to use to derive the address of the created account. Must be the same as the base key used to create `newAccountPubkey` */
  basePubkey: PublicKey;
  /** Seed to use to derive the address of the created account. Must be the same as the seed used to create `newAccountPubkey` */
  seed: string;
  /** Amount of lamports to transfer to the created account */
  lamports: number;
  /** Amount of space in bytes to allocate to the created account */
  space: number;
  /** Public key of the program to assign as the owner of the created account */
  programId: PublicKey;
};

/**
 * Create nonce account system transaction params
 */
export type CreateNonceAccountParams = {
  /** The account that will transfer lamports to the created nonce account */
  fromPubkey: PublicKey;
  /** Public key of the created nonce account */
  noncePubkey: PublicKey;
  /** Public key to set as authority of the created nonce account */
  authorizedPubkey: PublicKey;
  /** Amount of lamports to transfer to the created nonce account */
  lamports: number;
};

/**
 * Create nonce account with seed system transaction params
 */
export type CreateNonceAccountWithSeedParams = {
  /** The account that will transfer lamports to the created nonce account */
  fromPubkey: PublicKey;
  /** Public key of the created nonce account */
  noncePubkey: PublicKey;
  /** Public key to set as authority of the created nonce account */
  authorizedPubkey: PublicKey;
  /** Amount of lamports to transfer to the created nonce account */
  lamports: number;
  /** Base public key to use to derive the address of the nonce account */
  basePubkey: PublicKey;
  /** Seed to use to derive the address of the nonce account */
  seed: string;
};

/**
 * Initialize nonce account system instruction params
 */
export type InitializeNonceParams = {
  /** Nonce account which will be initialized */
  noncePubkey: PublicKey;
  /** Public key to set as authority of the initialized nonce account */
  authorizedPubkey: PublicKey;
};

/**
 * Advance nonce account system instruction params
 */
export type AdvanceNonceParams = {
  /** Nonce account */
  noncePubkey: PublicKey;
  /** Public key of the nonce authority */
  authorizedPubkey: PublicKey;
};

/**
 * Withdraw nonce account system transaction params
 */
export type WithdrawNonceParams = {
  /** Nonce account */
  noncePubkey: PublicKey;
  /** Public key of the nonce authority */
  authorizedPubkey: PublicKey;
  /** Public key of the account which will receive the withdrawn nonce account balance */
  toPubkey: PublicKey;
  /** Amount of lamports to withdraw from the nonce account */
  lamports: number;
};

/**
 * Authorize nonce account system transaction params
 */
export type AuthorizeNonceParams = {
  /** Nonce account */
  noncePubkey: PublicKey;
  /** Public key of the current nonce authority */
  authorizedPubkey: PublicKey;
  /** Public key to set as the new nonce authority */
  newAuthorizedPubkey: PublicKey;
};

/**
 * Allocate account system transaction params
 */
export type AllocateParams = {
  /** Account to allocate */
  accountPubkey: PublicKey;
  /** Amount of space in bytes to allocate */
  space: number;
};

/**
 * Allocate account with seed system transaction params
 */
export type AllocateWithSeedParams = {
  /** Account to allocate */
  accountPubkey: PublicKey;
  /** Base public key to use to derive the address of the allocated account */
  basePubkey: PublicKey;
  /** Seed to use to derive the address of the allocated account */
  seed: string;
  /** Amount of space in bytes to allocate */
  space: number;
  /** Public key of the program to assign as the owner of the allocated account */
  programId: PublicKey;
};

/**
 * Assign account with seed system transaction params
 */
export type AssignWithSeedParams = {
  /** Public key of the account which will be assigned a new owner */
  accountPubkey: PublicKey;
  /** Base public key to use to derive the address of the assigned account */
  basePubkey: PublicKey;
  /** Seed to use to derive the address of the assigned account */
  seed: string;
  /** Public key of the program to assign as the owner */
  programId: PublicKey;
};

/**
 * Transfer with seed system transaction params
 */
export type TransferWithSeedParams = {
  /** Account that will transfer lamports */
  fromPubkey: PublicKey;
  /** Base public key to use to derive the funding account address */
  basePubkey: PublicKey;
  /** Account that will receive transferred lamports */
  toPubkey: PublicKey;
  /** Amount of lamports to transfer */
  lamports: number;
  /** Seed to use to derive the funding account address */
  seed: string;
  /** Program id to use to derive the funding account address */
  programId: PublicKey;
};

/**
 * System Instruction class
 */
export class SystemInstruction {
  /**
   * @internal
   */
  constructor() {}

  /**
   * Decode a system instruction and retrieve the instruction type.
   */
  static decodeInstructionType(
    instruction: TransactionInstruction,
  ): SystemInstructionType {
    this.checkProgramId(instruction.programId);

    const instructionTypeLayout = BufferLayout.u32('instruction');
    const typeIndex = instructionTypeLayout.decode(instruction.data);

    let type: SystemInstructionType | undefined;
    for (const [ixType, layout] of Object.entries(SYSTEM_INSTRUCTION_LAYOUTS)) {
      if (layout.index == typeIndex) {
        type = ixType as SystemInstructionType;
        break;
      }
    }

    if (!type) {
      throw new Error('Instruction type incorrect; not a SystemInstruction');
    }

    return type;
  }

  /**
   * Decode a create account system instruction and retrieve the instruction params.
   */
  static decodeCreateAccount(
    instruction: TransactionInstruction,
  ): CreateAccountParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);

    const {lamports, space, programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.Create,
      instruction.data,
    );

    return {
      fromPubkey: instruction.keys[0].pubkey,
      newAccountPubkey: instruction.keys[1].pubkey,
      lamports,
      space,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode a transfer system instruction and retrieve the instruction params.
   */
  static decodeTransfer(instruction: TransactionInstruction): TransferParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);

    const {lamports} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.Transfer,
      instruction.data,
    );

    return {
      fromPubkey: instruction.keys[0].pubkey,
      toPubkey: instruction.keys[1].pubkey,
      lamports,
    };
  }

  /**
   * Decode a createnode system instruction and retrieve the instruction params.
   */
  static decodeCreateNode(instruction: TransactionInstruction): CreateNodeParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);

    const {reward_address, node_type} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.CreateNode,
      instruction.data,
    );

    return {
      fromPubkey: instruction.keys[0].pubkey,
      reward_address: new PublicKey(reward_address),
      node_type
    };
  }


  /**
   * Decode a transfer with seed system instruction and retrieve the instruction params.
   */
  static decodeTransferWithSeed(
    instruction: TransactionInstruction,
  ): TransferWithSeedParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);

    const {lamports, seed, programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed,
      instruction.data,
    );

    return {
      fromPubkey: instruction.keys[0].pubkey,
      basePubkey: instruction.keys[1].pubkey,
      toPubkey: instruction.keys[2].pubkey,
      lamports,
      seed,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode an allocate system instruction and retrieve the instruction params.
   */
  static decodeAllocate(instruction: TransactionInstruction): AllocateParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);

    const {space} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.Allocate,
      instruction.data,
    );

    return {
      accountPubkey: instruction.keys[0].pubkey,
      space,
    };
  }

  /**
   * Decode an allocate with seed system instruction and retrieve the instruction params.
   */
  static decodeAllocateWithSeed(
    instruction: TransactionInstruction,
  ): AllocateWithSeedParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);

    const {base, seed, space, programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed,
      instruction.data,
    );

    return {
      accountPubkey: instruction.keys[0].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      space,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode an assign system instruction and retrieve the instruction params.
   */
  static decodeAssign(instruction: TransactionInstruction): AssignParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);

    const {programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.Assign,
      instruction.data,
    );

    return {
      accountPubkey: instruction.keys[0].pubkey,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode an assign with seed system instruction and retrieve the instruction params.
   */
  static decodeAssignWithSeed(
    instruction: TransactionInstruction,
  ): AssignWithSeedParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);

    const {base, seed, programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed,
      instruction.data,
    );

    return {
      accountPubkey: instruction.keys[0].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode a create account with seed system instruction and retrieve the instruction params.
   */
  static decodeCreateWithSeed(
    instruction: TransactionInstruction,
  ): CreateAccountWithSeedParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);

    const {base, seed, lamports, space, programId} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed,
      instruction.data,
    );

    return {
      fromPubkey: instruction.keys[0].pubkey,
      newAccountPubkey: instruction.keys[1].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      lamports,
      space,
      programId: new PublicKey(programId),
    };
  }

  /**
   * Decode a nonce initialize system instruction and retrieve the instruction params.
   */
  static decodeNonceInitialize(
    instruction: TransactionInstruction,
  ): InitializeNonceParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);

    const {authorized} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount,
      instruction.data,
    );

    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: new PublicKey(authorized),
    };
  }

  /**
   * Decode a nonce advance system instruction and retrieve the instruction params.
   */
  static decodeNonceAdvance(
    instruction: TransactionInstruction,
  ): AdvanceNonceParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);

    decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount,
      instruction.data,
    );

    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey,
    };
  }

  /**
   * Decode a nonce withdraw system instruction and retrieve the instruction params.
   */
  static decodeNonceWithdraw(
    instruction: TransactionInstruction,
  ): WithdrawNonceParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 5);

    const {lamports} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount,
      instruction.data,
    );

    return {
      noncePubkey: instruction.keys[0].pubkey,
      toPubkey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[4].pubkey,
      lamports,
    };
  }

  /**
   * Decode a nonce authorize system instruction and retrieve the instruction params.
   */
  static decodeNonceAuthorize(
    instruction: TransactionInstruction,
  ): AuthorizeNonceParams {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);

    const {authorized} = decodeData(
      SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount,
      instruction.data,
    );

    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[1].pubkey,
      newAuthorizedPubkey: new PublicKey(authorized),
    };
  }

  /**
   * @internal
   */
  static checkProgramId(programId: PublicKey) {
    if (!programId.equals(SystemProgram.programId)) {
      throw new Error('invalid instruction; programId is not SystemProgram');
    }
  }

  /**
   * @internal
   */
  static checkKeyLength(keys: Array<any>, expectedLength: number) {
    if (keys.length < expectedLength) {
      throw new Error(
        `invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`,
      );
    }
  }
}

/**
 * An enumeration of valid SystemInstructionType's
 */
export type SystemInstructionType =
  | 'AdvanceNonceAccount'
  | 'Allocate'
  | 'AllocateWithSeed'
  | 'Assign'
  | 'AssignWithSeed'
  | 'AuthorizeNonceAccount'
  | 'Create'
  | 'CreateWithSeed'
  | 'InitializeNonceAccount'
  | 'Transfer'
  | 'TransferWithSeed'
  | 'WithdrawNonceAccount'
  | 'CreateNode'
  | 'AddGrant'
  | 'VoteOnGrant'
  | 'DissolveGrant';

/**
 * An enumeration of valid system InstructionType's
 * @internal
 */
export const SYSTEM_INSTRUCTION_LAYOUTS: {
  [type in SystemInstructionType]: InstructionType;
} = Object.freeze({
  Create: {
    index: 0,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.ns64('lamports'),
      BufferLayout.ns64('space'),
      Layout.publicKey('programId'),
    ]),
  },
  Assign: {
    index: 1,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('programId'),
    ]),
  },
  Transfer: {
    index: 2,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.ns64('lamports'),
    ]),
  },
  CreateWithSeed: {
    index: 3,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('base'),
      Layout.rustString('seed'),
      BufferLayout.ns64('lamports'),
      BufferLayout.ns64('space'),
      Layout.publicKey('programId'),
    ]),
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: BufferLayout.struct([BufferLayout.u32('instruction')]),
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.ns64('lamports'),
    ]),
  },
  InitializeNonceAccount: {
    index: 6,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('authorized'),
    ]),
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('authorized'),
    ]),
  },
  Allocate: {
    index: 8,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.ns64('space'),
    ]),
  },
  AllocateWithSeed: {
    index: 9,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('base'),
      Layout.rustString('seed'),
      BufferLayout.ns64('space'),
      Layout.publicKey('programId'),
    ]),
  },
  AssignWithSeed: {
    index: 10,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('base'),
      Layout.rustString('seed'),
      Layout.publicKey('programId'),
    ]),
  },
  TransferWithSeed: {
    index: 11,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.ns64('lamports'),
      Layout.rustString('seed'),
      Layout.publicKey('programId'),
    ]),
  },
  CreateNode: {
    index: 12,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      Layout.publicKey('reward_address'),
      BufferLayout.s8('node_type'),
    ]),
  },
  AddGrant: {
    index: 13,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.s16('grantid'),
      Layout.publicKey('receiving_address'),
      BufferLayout.ns64('amount'),
    ]),
  },
  VoteOnGrant: {
    index: 14,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.blob(32,'granthash'),
      BufferLayout.blob(1,'vote'),
      BufferLayout.blob(32,'nodehash'),
    ]),
  },
  DissolveGrant: {
    index: 15,
    layout: BufferLayout.struct([
      BufferLayout.u32('instruction'),
      BufferLayout.blob(32,'granthash'),
    ]),
  },
});

/**
 * Factory class for transactions to interact with the System program
 */
export class SystemProgram {
  /**
   * @internal
   */
  constructor() {}

  /**
   * Public key that identifies the System program
   */
  static programId: PublicKey = new PublicKey(
    '11111111111111111111111111111111',
  );

  /**
   * Generate a transaction instruction that creates a new account
   */
  static createAccount(params: CreateAccountParams): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.Create;
    const data = encodeData(type, {
      lamports: params.lamports,
      space: params.space,
      programId: toBuffer(params.programId.toBuffer()),
    });

    return new TransactionInstruction({
      keys: [
        {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
        {pubkey: params.newAccountPubkey, isSigner: true, isWritable: true},
      ],
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction that transfers lamports from one account to another
   */
  static transfer(
    params: TransferParams | TransferWithSeedParams,
  ): TransactionInstruction {
    let data;
    let keys;
    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
      data = encodeData(type, {
        lamports: params.lamports,
        seed: params.seed,
        programId: toBuffer(params.programId.toBuffer()),
      });
      keys = [
        {pubkey: params.fromPubkey, isSigner: false, isWritable: true},
        {pubkey: params.basePubkey, isSigner: true, isWritable: false},
        {pubkey: params.toPubkey, isSigner: false, isWritable: true},
      ];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
      data = encodeData(type, {lamports: params.lamports});
      keys = [
        {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
        {pubkey: params.toPubkey, isSigner: false, isWritable: true},
      ];
    }//d4f136556df340bd533e94e0c1bcf90c1a2f5ea9684c9090404f9317c1ee4744 37538f1ed0ebf8a3a48e4461cd55e49b0120f87fdd13bfe48f3999d1b41926d3

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

	
  /**
   * Generate a transaction instruction to create a Disintegration Node
   */
  static createnode(
      params: CreateNodeParams,
  ): TransactionInstruction {
    let data;
    let keys;
    // if ('basePubkey' in params) {
    //   const type = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
    //   data = encodeData(type, {
    //     lamports: params.lamports,
    //     seed: params.seed,
    //     programId: toBuffer(params.programId.toBuffer()),
    //   });
    //   keys = [
    //     {pubkey: params.fromPubkey, isSigner: false, isWritable: true},
    //     {pubkey: params.basePubkey, isSigner: true, isWritable: false},
    //     {pubkey: params.toPubkey, isSigner: false, isWritable: true},
    //   ];
    // } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.CreateNode;
      data = encodeData(type, {
        reward_address: toBuffer(params.reward_address.toBuffer()),
        node_type: params.node_type,
      });
      keys = [
        {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
        {pubkey: SYSVAR_FNODEDATA_PUBKEY, isSigner: false, isWritable: true},
      ];
    //}

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction to add grant
   */
  static addgrant(
    params: AddGrantParams,
  ): TransactionInstruction {
    let data;
    let keys;

    const type = SYSTEM_INSTRUCTION_LAYOUTS.AddGrant;
    data = encodeData(type, {
      grantid: params.GrantID,
      receiving_address: toBuffer(params.ReceivingAddress.toBuffer()),
      amount: params.GrantAmount,
    });
    keys = [
      {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
      {pubkey: GRANT_DATA_PUBKEY, isSigner: false, isWritable: true},
	  {pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false},
    ];
    //}

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction to dissolve a grant
   */
  static dissolvegrant(
    params: DissolveGrant,
  ): TransactionInstruction {
    let data;
    let keys;

    const type = SYSTEM_INSTRUCTION_LAYOUTS.DissolveGrant;
    data = encodeData(type, {
      granthash: params.GrantHash,
    });
    keys = [
      {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
      {pubkey: GRANT_DATA_PUBKEY, isSigner: false, isWritable: true},
    ];
    //}

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction to vote on a grant
   */
  static voteongrant(
    params: VoteOnGrant,
  ): TransactionInstruction {
    let data;
    let keys;

    let vote_buffer = Buffer.from('00','hex');
    if (params.Vote){
      vote_buffer = Buffer.from('01','hex');
    }

    const type = SYSTEM_INSTRUCTION_LAYOUTS.VoteOnGrant;
    data = encodeData(type, {
      granthash: params.GrantHash,
      vote: vote_buffer,
      nodehash: params.NodeHash,
    });
    keys = [
      {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
      {pubkey: GRANT_DATA_PUBKEY, isSigner: false, isWritable: true},
    ];
    //}

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction that assigns an account to a program
   */
  static assign(
    params: AssignParams | AssignWithSeedParams,
  ): TransactionInstruction {
    let data;
    let keys;
    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
      data = encodeData(type, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        programId: toBuffer(params.programId.toBuffer()),
      });
      keys = [
        {pubkey: params.accountPubkey, isSigner: false, isWritable: true},
        {pubkey: params.basePubkey, isSigner: true, isWritable: false},
      ];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
      data = encodeData(type, {
        programId: toBuffer(params.programId.toBuffer()),
      });
      keys = [{pubkey: params.accountPubkey, isSigner: true, isWritable: true}];
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction that creates a new account at
   *   an address generated with `from`, a seed, and programId
   */
  static createAccountWithSeed(
    params: CreateAccountWithSeedParams,
  ): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
    const data = encodeData(type, {
      base: toBuffer(params.basePubkey.toBuffer()),
      seed: params.seed,
      lamports: params.lamports,
      space: params.space,
      programId: toBuffer(params.programId.toBuffer()),
    });
    let keys = [
      {pubkey: params.fromPubkey, isSigner: true, isWritable: true},
      {pubkey: params.newAccountPubkey, isSigner: false, isWritable: true},
    ];
    if (params.basePubkey != params.fromPubkey) {
      keys.push({pubkey: params.basePubkey, isSigner: true, isWritable: false});
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction that creates a new Nonce account
   */
  static createNonceAccount(
    params: CreateNonceAccountParams | CreateNonceAccountWithSeedParams,
  ): Transaction {
    const transaction = new Transaction();
    if ('basePubkey' in params && 'seed' in params) {
      transaction.add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          basePubkey: params.basePubkey,
          seed: params.seed,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId,
        }),
      );
    } else {
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId,
        }),
      );
    }

    const initParams = {
      noncePubkey: params.noncePubkey,
      authorizedPubkey: params.authorizedPubkey,
    };

    transaction.add(this.nonceInitialize(initParams));
    return transaction;
  }

  /**
   * Generate an instruction to initialize a Nonce account
   */
  static nonceInitialize(
    params: InitializeNonceParams,
  ): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
    const data = encodeData(type, {
      authorized: toBuffer(params.authorizedPubkey.toBuffer()),
    });
    const instructionData = {
      keys: [
        {pubkey: params.noncePubkey, isSigner: false, isWritable: true},
        {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
        {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
      ],
      programId: this.programId,
      data,
    };
    return new TransactionInstruction(instructionData);
  }

  /**
   * Generate an instruction to advance the nonce in a Nonce account
   */
  static nonceAdvance(params: AdvanceNonceParams): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
    const data = encodeData(type);
    const instructionData = {
      keys: [
        {pubkey: params.noncePubkey, isSigner: false, isWritable: true},
        {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
        {pubkey: params.authorizedPubkey, isSigner: true, isWritable: false},
      ],
      programId: this.programId,
      data,
    };
    return new TransactionInstruction(instructionData);
  }

  /**
   * Generate a transaction instruction that withdraws lamports from a Nonce account
   */
  static nonceWithdraw(params: WithdrawNonceParams): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
    const data = encodeData(type, {lamports: params.lamports});

    return new TransactionInstruction({
      keys: [
        {pubkey: params.noncePubkey, isSigner: false, isWritable: true},
        {pubkey: params.toPubkey, isSigner: false, isWritable: true},
        {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
        {pubkey: params.authorizedPubkey, isSigner: true, isWritable: false},
      ],
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction that authorizes a new PublicKey as the authority
   * on a Nonce account.
   */
  static nonceAuthorize(params: AuthorizeNonceParams): TransactionInstruction {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
    const data = encodeData(type, {
      authorized: toBuffer(params.newAuthorizedPubkey.toBuffer()),
    });

    return new TransactionInstruction({
      keys: [
        {pubkey: params.noncePubkey, isSigner: false, isWritable: true},
        {pubkey: params.authorizedPubkey, isSigner: true, isWritable: false},
      ],
      programId: this.programId,
      data,
    });
  }

  /**
   * Generate a transaction instruction that allocates space in an account without funding
   */
  static allocate(
    params: AllocateParams | AllocateWithSeedParams,
  ): TransactionInstruction {
    let data;
    let keys;
    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
      data = encodeData(type, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        space: params.space,
        programId: toBuffer(params.programId.toBuffer()),
      });
      keys = [
        {pubkey: params.accountPubkey, isSigner: false, isWritable: true},
        {pubkey: params.basePubkey, isSigner: true, isWritable: false},
      ];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
      data = encodeData(type, {
        space: params.space,
      });
      keys = [{pubkey: params.accountPubkey, isSigner: true, isWritable: true}];
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data,
    });
  }
}
