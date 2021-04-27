/*
    Matrix
*/
function projection(width,height,depth=400){
    return [
        2/width,    0,        0,     0,
           0,   -2/height,    0,     0,
           0,       0,     2/depth,  0,
          -1,       1,        0,     1,
    ];
}

function identity(){
    return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ];
}

function translate(m,p){
    const t_matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        p[0], p[1], p[2], 1
    ]
    return multiply(m,t_matrix);
}

function moveto(m,p){
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    return translate(m,p);
}

function multiply(m, n){
    //m
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4]
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    //n
    const n00 = n[0];
    const n01 = n[1];
    const n02 = n[2];
    const n03 = n[3];
    const n10 = n[4]
    const n11 = n[5];
    const n12 = n[6];
    const n13 = n[7];
    const n20 = n[8];
    const n21 = n[9];
    const n22 = n[10];
    const n23 = n[11];
    const n30 = n[12];
    const n31 = n[13];
    const n32 = n[14];
    const n33 = n[15];

    return [
        n00*m00 + n01*m10 + n02*m20 + n03*m30,
        n00*m01 + n01*m11 + n02*m21 + n03*m31,
        n00*m02 + n01*m12 + n02*m22 + n03*m32,
        n00*m03 + n01*m13 + n02*m23 + n03*m33,
        n10*m00 + n11*m10 + n12*m20 + n13*m30,
        n10*m01 + n11*m11 + n12*m21 + n13*m31,
        n10*m02 + n11*m12 + n12*m22 + n13*m32,
        n10*m03 + n11*m13 + n12*m23 + n13*m33,
        n20*m00 + n21*m10 + n22*m20 + n23*m30,
        n20*m01 + n21*m11 + n22*m21 + n23*m31,
        n20*m02 + n21*m12 + n22*m22 + n23*m32,
        n20*m03 + n21*m13 + n22*m23 + n23*m33,
        n30*m00 + n31*m10 + n32*m20 + n33*m30,
        n30*m01 + n31*m11 + n32*m21 + n33*m31,
        n30*m02 + n31*m12 + n32*m22 + n33*m32,
        n30*m03 + n31*m13 + n32*m23 + n33*m33,
    ];
}


function multiplyM(m,i,n,j){
    const result = [];

    for(let k = 0; k < i; k++){
        for(let l = 0; l < j; l++){
            // console.log( m[k*i] + " " + m[k*i+1] + " " + m[k*i+2] + " " + m[k*i+3]);
            // console.log( n[l] + " " + n[l + j] + " " + n[l + j*2] + " " + n[l + j*3]);
            const s = m[k*i]*n[l] + m[k*i+1]*n[l + j] + m[k*i+2]*n[l + j*2] + m[k*i+3]*n[l + j*3];
            result.push(s);
        }
    }
    return result;
}


//testing
// const s = [
//     1,0,0,0,
//     0,1,0,0,
//     0,0,1,0,
//     0,0,0,1
// ]

// const n = [
//     1,2,3,4,
// ]
// console.log(multiplyM(s,4,n,1));
