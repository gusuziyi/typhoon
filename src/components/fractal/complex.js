const complexAdd = (complexA, complexB) => {
	let complexResult ={}
	complexResult.real = complexA.real + complexB.real
	complexResult.illus = complexA.illus + complexB.illus
	return complexResult
}

const complexMult = (complexA, complexB) => {
	let complexResult ={}
	complexResult.real = complexA.real * complexB.real - complexA.illus * complexB.illus
	complexResult.illus = complexA.real * complexB.illus + complexA.illus * complexB.real
	return complexResult
}

const mod = (complex) => {
	return complex.real * complex.real + complex.illus * complex.illus
}

export default {
	complexAdd,
	complexMult,
	mod
}
