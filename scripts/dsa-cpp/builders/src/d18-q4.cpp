#include <bits/stdc++.h>
using namespace std;

int boats_for_two(int w1, int w2, int limit) {
    return w1 + w2 <= limit ? 1 : 2;
}

int main() {
    int w1, w2, limit;
    cin >> w1 >> w2 >> limit;
    cout << boats_for_two(w1, w2, limit) << "\n";
    return 0;
}
