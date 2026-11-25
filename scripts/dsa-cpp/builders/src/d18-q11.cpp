#include <bits/stdc++.h>
using namespace std;

int can_serve_all(const std::vector<int>& bills) {
    int fives = 0, tens = 0;
    for (int b : bills) {
        if (b == 5) {
            fives++;
        } else if (b == 10) {
            if (fives == 0) return 0;
            fives--;
            tens++;
        } else {
            if (tens > 0 && fives > 0) { tens--; fives--; }
            else if (fives >= 3) fives -= 3;
            else return 0;
        }
    }
    return 1;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> bills(n);
    for (int& x : bills) cin >> x;
    cout << can_serve_all(bills) << "\n";
    return 0;
}
