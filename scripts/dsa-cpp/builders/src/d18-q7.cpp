#include <bits/stdc++.h>
using namespace std;

int platforms_for_two(int a1, int d1, int a2, int d2) {
    return (a1 < d2 && a2 < d1) ? 2 : 1;
}

int main() {
    int a1, d1, a2, d2;
    cin >> a1 >> d1 >> a2 >> d2;
    cout << platforms_for_two(a1, d1, a2, d2) << "\n";
    return 0;
}
